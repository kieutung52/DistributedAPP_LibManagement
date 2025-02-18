package com.service.transaction_service.service;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Service;

import com.service.transaction_service.model.Transaction;
import com.service.transaction_service.repository.TransactionRepository;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final AmqpTemplate amqpTemplate;

    public TransactionService(TransactionRepository transactionRepository, AmqpTemplate amqpTemplate) {
        this.transactionRepository = transactionRepository;
        this.amqpTemplate = amqpTemplate;
    }

    public Transaction createTransaction(Transaction req) {
        req.setStatus("PENDING");
        req.setBorrowStatus("NONE");
        transactionRepository.save(req);
        String userMsg = req.getUserId() + "";
        amqpTemplate.convertAndSend("libraryExchange","user.created",userMsg);
        return req;
    }

    public Transaction updateTransaction(int id, Transaction newData) {
        Transaction old = transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found Transaction by id " + id));
        old.setDueDate(newData.getDueDate());
        old.setStartDate(newData.getStartDate());
        transactionRepository.save(old);
        return old;
    }

    public Iterable<Transaction> getAll() {
        return transactionRepository.findAll();
    }

    public Transaction getTransactionById(int id) {
        return transactionRepository.findById(id).orElse(null);
    }

    public void deleteTransactionById(int id) {
        transactionRepository.deleteById(id);
    }

    public Transaction updateTransactionStatus(int id, String status) {
        Transaction temp = transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found transaction by id " + id));
        temp.setStatus(status);
        String transactionMsg = temp.getUserId() + "";
        String bookMsg = temp.getBookId() + "|";
        if(status.equals("ACCEPT")) {
            temp.setBorrowStatus("ON_TIME");
            bookMsg += "Down";
            amqpTemplate.convertAndSend("libraryExchange","user.notiAcceptRequest",transactionMsg);
            amqpTemplate.convertAndSend("libraryExchange","book.updateQuantity",bookMsg);
        } else if (status.equals("CANCEL")) {
            amqpTemplate.convertAndSend("libraryExchange","user.notiCancelRequest",transactionMsg);
        }
        transactionRepository.save(temp);
        return temp;
    }

    public Transaction returnBook(int id) {
        Transaction temp = transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found transaction by id " + id));
        if (!(temp.getStatus().equals("ACCEPT"))){
            return null;
        }
        temp.setBorrowStatus("RETURNED");
        transactionRepository.save(temp);
        String bookMsg = temp.getBookId() + "|" + "Up";
        String notiMsg = temp.getUserId() + "|Returned";
        amqpTemplate.convertAndSend("libraryExchange","user.notiReturnBook",notiMsg);
        amqpTemplate.convertAndSend("libraryExchange","book.updateQuantity",bookMsg);
        return temp;
    }
}

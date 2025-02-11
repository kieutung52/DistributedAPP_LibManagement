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
        transactionRepository.save(req);
        String userMsg = req.getUserId() + "";
        amqpTemplate.convertAndSend("libraryExchange","user.created",userMsg);
        return req;
    }

    public Transaction updateTransaction(int id, Transaction newData) {
        Transaction old = transactionRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found Transaction by id " + id));
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
        if(status.equals("ACCEPT")) {
            temp.setBorrowStatus("ON_TIME");
            amqpTemplate.convertAndSend("libraryExchange","user.notiAcceptRequest",transactionMsg);
        } else if (status.equals("CANCEL")) {
            amqpTemplate.convertAndSend("libraryExchange","user.notiCancelRequest",transactionMsg);
        }
        transactionRepository.save(temp);
        return temp;
    } 
}

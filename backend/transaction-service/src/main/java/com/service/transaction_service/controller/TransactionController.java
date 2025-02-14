package com.service.transaction_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.transaction_service.model.Transaction;
import com.service.transaction_service.service.TransactionService;

@RestController
@RequestMapping("/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    // create
    @PostMapping("/create")
    public ResponseEntity<?> createTransaction(@RequestBody Transaction req) {
        try {
            Transaction b = transactionService.createTransaction(req);
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // get all
    @GetMapping("/all")
    public ResponseEntity<?> getAllTransaction() {
        return ResponseEntity.ok(transactionService.getAll());
    }

    // Lấy 1
    @GetMapping("/{id}")
    public ResponseEntity<?> getTransaction(@PathVariable int id) {
        Transaction b = transactionService.getTransactionById(id);
        if (b == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(b);
    }

    // edit
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(@PathVariable int id, @RequestBody Transaction newData) {
        try {
            Transaction b = transactionService.updateTransaction(id, newData);
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/accept")
    public ResponseEntity<?> updateStatusAccept(@PathVariable int id) {
        try {
            Transaction b = transactionService.updateTransactionStatus(id,"ACCEPT");
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/returnbook")
    public ResponseEntity<?> returnBook(@PathVariable int id) {
        try {
            Transaction b = transactionService.returnBook(id);
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> updateStatusCancel(@PathVariable int id) {
        try {
            Transaction b = transactionService.updateTransactionStatus(id,"CANCELED");
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(@PathVariable int id) {
        transactionService.deleteTransactionById(id);
        return ResponseEntity.ok("Deleted Transaction " + id);
    }
}

package com.service.transaction_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.transaction_service.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}

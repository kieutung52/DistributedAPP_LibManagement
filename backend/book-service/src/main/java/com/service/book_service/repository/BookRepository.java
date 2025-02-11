package com.service.book_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.service.book_service.model.Book;

public interface BookRepository extends JpaRepository<Book, Integer> {
}

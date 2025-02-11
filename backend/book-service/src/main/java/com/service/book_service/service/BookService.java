package com.service.book_service.service;

import org.springframework.stereotype.Service;

import com.service.book_service.model.Book;
import com.service.book_service.repository.BookRepository;

@Service
public class BookService {
    private final BookRepository bookRepository;

    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public Book createBook(Book req) {
        bookRepository.save(req);
        return req;
    }

    public Book updateBook(int id, Book newData) {
        Book old = bookRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found book by id " + id));
        old.setIsbn(newData.getIsbn());
        old.setTitle(newData.getTitle());
        old.setAuthor(newData.getAuthor());
        old.setPublisher(newData.getPublisher());
        old.setQuantity(newData.getQuantity());
        old.setYear(newData.getYear());
        bookRepository.save(old);
        return old;
    }

    public Iterable<Book> getAll() {
        return bookRepository.findAll();
    }

    public Book getBookById(int id) {
        return bookRepository.findById(id).orElse(null);
    }

    public void deleteBookById(int id) {
        bookRepository.deleteById(id);
    }
}

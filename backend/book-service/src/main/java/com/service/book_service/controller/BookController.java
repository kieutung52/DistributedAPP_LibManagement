package com.service.book_service.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.book_service.model.Book;
import com.service.book_service.service.BookService;

@RestController
@RequestMapping("/book")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    // create
    @PostMapping("/create")
    public ResponseEntity<?> createBook(@RequestBody Book req) {
        try {
            Book b = bookService.createBook(req);
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // get all
    @GetMapping("/all")
    public ResponseEntity<?> getAllBooks() {
        return ResponseEntity.ok(bookService.getAll());
    }

    // Lấy 1
    @GetMapping("/{id}")
    public ResponseEntity<?> getBook(@PathVariable int id) {
        Book b = bookService.getBookById(id);
        if (b == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(b);
    }

    // edit
    @PutMapping("/{id}")
    public ResponseEntity<?> updateBook(@PathVariable int id, @RequestBody Book newData) {
        try {
            Book b = bookService.updateBook(id, newData);
            return ResponseEntity.ok(b);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // delete
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteBook(@PathVariable int id) {
        bookService.deleteBookById(id);
        return ResponseEntity.ok("Deleted Book " + id);
    }
}

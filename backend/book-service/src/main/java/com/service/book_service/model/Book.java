package com.service.book_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "book") 
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "isbn")
    private String isbn;

    @Column(name = "title")
    private String title;

    @Column(name = "author")
    private String author;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "year")
    private int year;

    @Column(name = "quantity")
    private int quantity;

    public Book() {}

    public Book(String isbn, String title, String author, String publisher, int year, int quantity) {
        this.isbn = isbn;
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.quantity = quantity;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }
    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }
    public void setTitle(String title) {
        this.title = title;
    }
    public void setYear(int year) {
        this.year = year;
    }
    
    public String getAuthor() {
        return author;
    }
    public int getId() {
        return id;
    }
    public String getIsbn() {
        return isbn;
    }
    public String getPublisher() {
        return publisher;
    }
    public int getQuantity() {
        return quantity;
    }
    public String getTitle() {
        return title;
    }
    public int getYear() {
        return year;
    }
}

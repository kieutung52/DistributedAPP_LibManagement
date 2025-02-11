package com.service.transaction_service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "transaction")
public class Transaction {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "userid")
    private int userId;

    @Column(name = "bookid")
    private int bookId;

    @Column(name = "startdate")
    private String startDate; // dd-mm-yyyy

    @Column(name = "duedate")
    private String dueDate; // dd-mm-yyyy

    @Column(name = "status")
    private String status; // "PENDDING", "ACCEPT", "CANCLED"

    @Column(name = "borrowstatus")
    private String borrowStatus; // "NONE", "ON_TIME", "DUE", "OVER_DUE"

    public Transaction() {}

    public Transaction(int userId, int bookId, String startDate, String dueDate, String status) {
        this.userId = userId;
        this.bookId = bookId;
        this.startDate = startDate;
        this.dueDate = dueDate;
        this.status = status;
        this.borrowStatus = "NONE";
    }

    public void setBookId(int bookId) {
        this.bookId = bookId;
    }
    public void setBorrowStatus(String borrowStatus) {
        this.borrowStatus = borrowStatus;
    }
    public void setDueDate(String dueDate) {
        this.dueDate = dueDate;
    }
    public void setId(int id) {
        this.id = id;
    }
    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }
    public void setStatus(String status) {
        this.status = status;
    }
    public void setUserId(int userId) {
        this.userId = userId;
    }
    
    public int getBookId() {
        return bookId;
    }
    public String getBorrowStatus() {
        return borrowStatus;
    }
    public String getDueDate() {
        return dueDate;
    }
    public int getId() {
        return id;
    }
    public String getStartDate() {
        return startDate;
    }
    public String getStatus() {
        return status;
    }
    public int getUserId() {
        return userId;
    }
}

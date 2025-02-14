package com.service.book_service.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import com.service.book_service.model.Book;
import com.service.book_service.service.BookService;

@Component
public class BookMessageListener {
    private final BookService bookService;

    public BookMessageListener(BookService bookService) {
        this.bookService = bookService;
    }

    @RabbitListener(queues = "bookServiceQueue")
    public void handleBookMessage(String message, @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        try {
            String[] parts = message.split("\\|");
            int id = Integer.parseInt(parts[0]);
            if (routingKey.equals("book.updateQuantity")) {
                Book book = bookService.getBookById(id);
                int quantity = book.getQuantity();
                if(parts[1].equals("Down")) {
                    quantity -= 1;
                } else if (parts[1].equals("Up")) {
                    quantity += 1;
                }
                book.setQuantity(quantity);
                bookService.updateBook(id, book);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

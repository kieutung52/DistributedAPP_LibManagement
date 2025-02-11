package com.service.book_service.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.ExchangeBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitConfig {

    public static final String EXCHANGE_NAME = "libraryExchange";

    // book Service Queue - chỉ nhận message liên quan book
    public static final String BOOK_QUEUE = "bookServiceQueue";
    public static final String BOOK_ROUTING_KEY = "book.#"; 

    @Bean
    public TopicExchange libraryExchange() {
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME)
                .durable(true)
                .build();
    }

    @Bean
    public Queue bookQueue() {
        return new Queue(BOOK_QUEUE, true);
    }

    @Bean
    public Binding bookBinding(Queue bookQueue, TopicExchange libraryExchange) {
        // book.# => route sang bookServiceQueue
        return BindingBuilder.bind(bookQueue)
                .to(libraryExchange)
                .with(BOOK_ROUTING_KEY);
    }
}

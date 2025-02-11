package com.service.transaction_service.config;

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

    // transaction Service Queue - chỉ nhận message liên quan transaction
    public static final String TRANSACTION_QUEUE = "transactionServiceQueue";
    public static final String TRANSACTION_ROUTING_KEY = "transaction.#"; 

    @Bean
    public TopicExchange libraryExchange() {
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME)
                .durable(true)
                .build();
    }

    @Bean
    public Queue transactionQueue() {
        return new Queue(TRANSACTION_QUEUE, true);
    }

    @Bean
    public Binding transactionBinding(Queue transactionQueue, TopicExchange libraryExchange) {
        // transaction.# => route sang transactionServiceQueue
        return BindingBuilder.bind(transactionQueue)
                .to(libraryExchange)
                .with(TRANSACTION_ROUTING_KEY);
    }
}

package com.service.user_service.config;

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

    // User Service Queue - chỉ nhận message liên quan user
    public static final String USER_QUEUE = "userServiceQueue";
    public static final String USER_ROUTING_KEY = "user.#"; 

    @Bean
    public TopicExchange libraryExchange() {
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME)
                .durable(true)
                .build();
    }

    @Bean
    public Queue userQueue() {
        return new Queue(USER_QUEUE, true);
    }

    @Bean
    public Binding userBinding(Queue userQueue, TopicExchange libraryExchange) {
        // user.# => route sang userServiceQueue
        return BindingBuilder.bind(userQueue)
                .to(libraryExchange)
                .with(USER_ROUTING_KEY);
    }
}
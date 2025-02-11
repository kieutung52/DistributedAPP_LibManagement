package com.service.notification_service.config;

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

    public static final String NOTIFICATION_QUEUE = "notificationServiceQueue";
    public static final String NOTIFICATION_ROUTING_KEY = "notification.#";

    @Bean
    public TopicExchange libraryExchange() {
        return ExchangeBuilder.topicExchange(EXCHANGE_NAME).durable(true).build();
    }

    @Bean
    public Queue notificationQueue() {
        return new Queue(NOTIFICATION_QUEUE, true);
    }

    @Bean
    public Binding notificationBinding(Queue notificationQueue, TopicExchange libraryExchange) {
        return BindingBuilder.bind(notificationQueue)
                .to(libraryExchange)
                .with(NOTIFICATION_ROUTING_KEY);
    }
}

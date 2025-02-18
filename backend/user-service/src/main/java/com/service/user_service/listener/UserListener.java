package com.service.user_service.listener;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import com.service.user_service.model.User;
import com.service.user_service.repository.UserRepository;

@Component
public class UserListener {
    private final UserRepository userRepository;
    private final AmqpTemplate amqpTemplate;

    public UserListener(UserRepository userRepository, AmqpTemplate amqpTemplate) {
        this.userRepository = userRepository;
        this.amqpTemplate = amqpTemplate;
    }

    @RabbitListener(queues = "userServiceQueue")
    public void handleUseMessage(String message, @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        try {
            int id = Integer.parseInt(message);
            User temp = userRepository.findById(id).orElse(null);
            String notiMsg = temp.getEmail() + "|" + "PKA Library" + "|";
            if (routingKey.equals("user.notiAcceptRequest")) {
                notiMsg += "The book borrowing request has been accepted";
            } else if (routingKey.equals("user.notiCancelRequest")) {
                notiMsg += "The book borrowing request has been canceled";
            } else if (routingKey.equals("user.notiCreated")) {
                notiMsg += "The book borrowing request has been created";
            } else if (routingKey.equals("user.notiReturnBook")) {
                notiMsg += "The book has been returned. Thanks for use our services";
            }
            amqpTemplate.convertAndSend("libraryExchange","notification.bookBorrowRequest",notiMsg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

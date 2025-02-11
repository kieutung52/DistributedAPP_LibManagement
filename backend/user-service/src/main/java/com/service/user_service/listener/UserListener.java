package com.service.user_service.listener;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.support.AmqpHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;

import com.service.user_service.model.User;
import com.service.user_service.service.UserService;

@Component
public class UserListener {
    private final UserService userService;
    private final AmqpTemplate amqpTemplate;

    public UserListener(UserService userService, AmqpTemplate amqpTemplate) {
        this.userService = userService;
        this.amqpTemplate = amqpTemplate;
    }

    @RabbitListener(queues = "userServiceQueue")
    public void handelUseMessage(String message, @Header(AmqpHeaders.RECEIVED_ROUTING_KEY) String routingKey) {
        try {
            int id = Integer.parseInt(message);
            User temp = userService.getUserById(id);
            String notiMsg = temp.getEmail() + "|" + "PKA Library" + "|";
            if (routingKey.equals("user.notiAcceptRequest")) {
                notiMsg += "The book borrowing request has been accepted";
            } else if (routingKey.equals("user.notiCancelRequest")) {
                notiMsg += "The book borrowing request has been canceled";
            } else if (routingKey.equals("user.notiCreated")) {
                notiMsg += "The book borrowing request has been created";
            }
            amqpTemplate.convertAndSend("libararyExchange","notification.bookBorrowRequest",notiMsg);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

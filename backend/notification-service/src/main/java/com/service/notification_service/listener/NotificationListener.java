package com.service.notification_service.listener;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Component;

@Component
public class NotificationListener {

    @Autowired
    private JavaMailSender mailSender;

    @RabbitListener(queues = "notificationServiceQueue")
    public void handleNotificationMessage(String message) {
        // Format: "toEmail|subject|content"
        try {
            String[] parts = message.split("\\|");
            if (parts.length < 3) {
                System.out.println("[Notification] invalid msg: " + message);
                return;
            }
            String toEmail = parts[0];
            String subject = parts[1];
            String content = parts[2];

            SimpleMailMessage mail = new SimpleMailMessage();
            mail.setTo(toEmail);
            mail.setSubject(subject);
            mail.setText(content);

            mailSender.send(mail);
            System.out.println("[Notification] Sent mail to: " + toEmail);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

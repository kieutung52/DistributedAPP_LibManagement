package com.service.notification_service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/notification") // Prefix tất cả các endpoint của Notification Service
public class EmailController {

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/send-email") // Đường dẫn thực tế sẽ là /notification/send-email
    public String sendEmail(@RequestParam String toEmail) {
        try {
            // Tạo nội dung email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(toEmail);
            message.setSubject("Test Email");
            message.setText("This is a test email from Spring Boot!");

            // Gửi email
            mailSender.send(message);

            return "Email sent successfully!";
        } catch (Exception e) {
            e.printStackTrace();
            return "Failed to send email: " + e.getMessage();
        }
    }
}

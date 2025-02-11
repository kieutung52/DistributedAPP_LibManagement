package com.service.user_service.service;

import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.stereotype.Service;

import com.service.user_service.model.User;
import com.service.user_service.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final AmqpTemplate amqpTemplate;

    public UserService(UserRepository userRepository, AmqpTemplate amqpTemplate) {
        this.userRepository = userRepository;
        this.amqpTemplate = amqpTemplate;
    }

    // Tạo user (Register)
    public User createUser(User user) {
        // Kiểm tra username trùng
        if (userRepository.findByUsername(user.getUsername()) != null) {
            throw new RuntimeException("Username đã tồn tại!");
        }
        userRepository.save(user);

        // Gửi 1 message sang Notification Service => Xác nhận đăng ký
        // Format: "toEmail|subject|content"
        String msg = user.getEmail() + "|Đăng ký thành công|Chào mừng " + user.getName();
        amqpTemplate.convertAndSend("hotelExchange", "notification.email", msg);

        return user;
    }

    // Login
    public User login(String username, String password) {
        User u = userRepository.findByUsername(username);
        if (u == null) {
            throw new RuntimeException("Không tìm thấy user!");
        }
        if (!u.getPassword().equals(password)) {
            throw new RuntimeException("Sai mật khẩu!");
        }
        return u;
    }

    // Lấy danh sách User
    public Iterable<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Lấy 1 user
    public User getUserById(int id) {
        return userRepository.findById(id).orElse(null);
    }

    // Sửa user
    public User updateUser(int id, User newData) {
        User old = userRepository.findById(id).orElseThrow(() -> new RuntimeException("Not found"));
        old.setName(newData.getName());
        old.setAddress(newData.getAddress());
        old.setEmail(newData.getEmail());
        old.setRole(newData.getRole());
        userRepository.save(old);
        return old;
    }

    // Xoá user
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }
}
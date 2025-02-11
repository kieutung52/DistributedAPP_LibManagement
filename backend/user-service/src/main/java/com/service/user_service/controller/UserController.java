package com.service.user_service.controller;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.service.user_service.model.User;
import com.service.user_service.service.UserService;

@RestController
@RequestMapping("/user") // -> /user/...
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Đăng ký user
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User req) {
        try {
            User newUser = userService.createUser(req);
            return ResponseEntity.ok(new ApiResponse("success", "Đăng ký thành công", newUser));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("error", e.getMessage(), null));
        }
    }

    // Login
    // @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User req) {
        try {
            User u = userService.login(req.getUsername(), req.getPassword());
            return ResponseEntity.ok(new ApiResponse("success", "Login thành công", u));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse("error", e.getMessage(), null));
        }
    }

    // Lấy tất cả user
    @GetMapping("/all")
    public ResponseEntity<?> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    // Lấy user theo id
    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable int id) {
        User u = userService.getUserById(id);
        if (u == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(u);
    }

    // Sửa user
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @RequestBody User req) {
        try {
            User updated = userService.updateUser(id, req);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Xoá user
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable int id) {
        userService.deleteUser(id);
        return ResponseEntity.ok("Deleted user " + id);
    }

    record ApiResponse(String status, String message, Object data) {}
}
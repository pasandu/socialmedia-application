package com.example.gymapi.controller;

import com.example.gymapi.DTO.LoginDto;
import com.example.gymapi.DTO.UserDto;
import com.example.gymapi.model.User;
import com.example.gymapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class UserController {

    private UserService userService;

    @PostMapping("/users")
    public User addUser(@RequestBody UserDto userDto){
        return userService.addUser(userDto);
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginDto loginDto) {
        return userService.login(loginDto);
    }
}
package com.example.gymapi.service.impl;

import com.example.gymapi.DTO.LoginDto;
import com.example.gymapi.DTO.UserDto;
import com.example.gymapi.model.User;
import com.example.gymapi.repository.UserRepository;
import com.example.gymapi.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Override
    public User addUser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setEmail(userDto.getEmail());
        user.setUserName(userDto.getUserName());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        userRepository.save(user);
        return user;
    }

    @Override
    public String login(LoginDto loginDto) {
        User user = userRepository.findByUserName(loginDto.getUsername());

        if (user == null) {
            return "User not found";
        }

        String password = loginDto.getPassword();
        String encodedPassword = user.getPassword();

        boolean isPwdRight = passwordEncoder.matches(password, encodedPassword);
        if (!isPwdRight) {
            return "Login failed";
        }
        return "Login Success";
    }
}
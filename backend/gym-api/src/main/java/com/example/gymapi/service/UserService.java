package com.example.gymapi.service;

import com.example.gymapi.DTO.LoginDto;
import com.example.gymapi.DTO.UserDto;
import com.example.gymapi.model.User;

public interface UserService {

    User addUser(UserDto userDto);
//    String login(LoginDto loginDto);
}

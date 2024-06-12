package com.example.gymapi.DTO;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Data
public class UserDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private String password;
}

package com.example.gymapi.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "user", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email"),
        @UniqueConstraint(columnNames = "userName")
})
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String userName;

    @JsonIgnore
    private String password;
}

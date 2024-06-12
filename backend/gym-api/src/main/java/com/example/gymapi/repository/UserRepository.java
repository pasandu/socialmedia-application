package com.example.gymapi.repository;

import com.example.gymapi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User , Long> {

     User findByUserName(String username);
}

package com.example.gymapi.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @Lob
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private byte[] imageData;
}


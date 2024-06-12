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
    private byte[] image1;

    @Lob
    private byte[] image2;

    @Lob
    private byte[] image3;

}

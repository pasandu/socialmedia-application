package com.example.gymapi.model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;


import lombok.Data;

@Data
@Entity

public class Meal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "recipe")
    private String recipe;
    
    @Column(name = "description")
    private String description;
    
    @Column(name = "portion_size")
    private String portionSize;
    
    @Column(name = "nutritional_info")
    private String nutritionalInfo;
    
    @Column(name = "cooking_instructions")
    private String cookingInstructions;
    
     @ElementCollection
    @Lob
    @CollectionTable(name = "post_images", joinColumns = @JoinColumn(name = "post_id"))
    @Column(name = "image_data", columnDefinition = "LONGBLOB")
    private List<byte[]> imageData = new ArrayList<>();
    
    
    @Column(name = "dietary_preference")
    private String dietaryPreference;
    
    @Column(name = "ingredients")
    private String ingredients;
    
    // Add other fields as needed

   

    // Getters and setters
}
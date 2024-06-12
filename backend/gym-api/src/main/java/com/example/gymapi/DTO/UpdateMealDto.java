package com.example.gymapi.DTO;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMealDto {


 


     private String recipe;
    private String description;
    private String portionSize;
    private String nutritionalInfo;
    private String cookingInstructions;
    private String dietaryPreference;
    private String ingredients;

}





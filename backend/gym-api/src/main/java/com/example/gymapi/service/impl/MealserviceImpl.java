package com.example.gymapi.service.impl;

import com.example.gymapi.DTO.MealDto;
import com.example.gymapi.DTO.UpdateMealDto;
import com.example.gymapi.model.Meal;
import com.example.gymapi.repository.MealRepository;
import com.example.gymapi.service.Mealservice;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class MealserviceImpl implements Mealservice {
    private final MealRepository mealRepository;

    @Override
    public String create(MealDto mealDto) {
        Meal meal = new Meal();
        meal.setRecipe(mealDto.getRecipe());
        meal.setDescription(mealDto.getDescription());
        meal.setPortionSize(mealDto.getPortionSize());
        meal.setNutritionalInfo(mealDto.getNutritionalInfo());
        meal.setCookingInstructions(mealDto.getCookingInstructions());
        meal.setDietaryPreference(mealDto.getDietaryPreference());
        meal.setIngredients(mealDto.getIngredients());

        List<MultipartFile> images = mealDto.getImages();
        if (images != null && !images.isEmpty()) {
            List<byte[]> imageData = new ArrayList<>();
            for (MultipartFile image : images) {
                try {
                    imageData.add(image.getBytes());
                } catch (IOException e) {
                    // Handle the exception
                }
            }
            meal.setImageData(imageData);
        }

        mealRepository.save(meal);
        return "Meal created";
    }


    @Override
    public Meal getMealById(Long mealId) {
        Optional<Meal> optionalMeal = mealRepository.findById(mealId);
        return optionalMeal.orElse(null);
    }


    
   

    @Override
    public void deleteMeal(Long mealId) {
        Optional<Meal> optionalMeal = mealRepository.findById(mealId);
        if (optionalMeal.isPresent()) {
            mealRepository.delete(optionalMeal.get());
        } else {
            throw new IllegalArgumentException("Meal not found with id: " + mealId);
        }
    }

    @Override
    public void updateMeal(Long mealId, UpdateMealDto mealDto ) {
        Optional<Meal> optionalMeal = mealRepository.findById(mealId);
        if (optionalMeal.isPresent()) {
            Meal meal = optionalMeal.get();
            meal.setRecipe(mealDto.getRecipe());
            meal.setDescription(mealDto.getDescription());
            meal.setPortionSize(mealDto.getPortionSize());
            meal.setNutritionalInfo(mealDto.getNutritionalInfo());
            meal.setCookingInstructions(mealDto.getCookingInstructions());
            meal.setDietaryPreference(mealDto.getDietaryPreference());
            meal.setIngredients(mealDto.getIngredients());
            mealRepository.save(meal);
        } else {
            throw new IllegalArgumentException("Meal not found with id: " + mealId);
        }
    }

    @Override
    public UpdateMealDto getUpdateMealById(Long mealId) {
        Optional<Meal> optionalMeal = mealRepository.findById(mealId);
        Meal meal = optionalMeal.get();
        UpdateMealDto dto = new UpdateMealDto();
        dto.setRecipe(meal.getRecipe());
        dto.setDescription(meal.getDescription());
        dto.setPortionSize(meal.getPortionSize());
        dto.setNutritionalInfo(meal.getNutritionalInfo());
        dto.setCookingInstructions(meal.getCookingInstructions());
        dto.setDietaryPreference(meal.getDietaryPreference());
        dto.setIngredients(meal.getIngredients());

        return dto;
    }
    // @Override
    // public void updateMeal(Long mealId, MealDto mealDto) {
    //     Optional<Meal> optionalMeal = mealRepository.findById(mealId);
    //     if (optionalMeal.isPresent()) {
    //         Meal meal = optionalMeal.get();
    //         // Update meal fields from mealDto
    //         mealRepository.save(meal);
    //     } else {
    //         throw new IllegalArgumentException("Meal not found with id: " + mealId);
    //     }
    // }

    @Override
    public List<Meal> getAllMeals(String dietaryPreference) {
        return mealRepository.findByDietaryPreference(dietaryPreference);
    }

    @Override
    public List<Meal> getAllMealDetails() {
        return mealRepository.findAll();
    }

   




   


   
        
}
package com.example.gymapi.service;

import java.util.List;
import java.util.Optional;

import com.example.gymapi.DTO.MealDto;
import com.example.gymapi.DTO.UpdateMealDto;
import com.example.gymapi.model.Meal;

public interface Mealservice {

   
       
    List<Meal> getAllMeals(String dietaryPreference);
    

   
    Meal getMealById(Long mealId);

    UpdateMealDto getUpdateMealById(Long mealId);

    String create(MealDto mealDto);

    void deleteMeal(Long mealId);

    void updateMeal(Long mealId, UpdateMealDto mealDto);

    


    List<Meal> getAllMealDetails();

   

    

}

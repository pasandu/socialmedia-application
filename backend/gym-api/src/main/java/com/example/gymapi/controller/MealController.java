package com.example.gymapi.controller;

import com.example.gymapi.DTO.MealDto;
import com.example.gymapi.DTO.UpdateMealDto;
import com.example.gymapi.model.Meal;
import com.example.gymapi.repository.MealRepository;
import com.example.gymapi.service.Mealservice;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@AllArgsConstructor
@CrossOrigin("http://localhost:3000")
public class MealController {
    private final Mealservice mealService;

    @PostMapping("/meals")
    public ResponseEntity<String> createMeal(
            @RequestPart("recipe") String recipe,
            @RequestPart("description") String description,
            @RequestPart("portionSize") String portionSize,
            @RequestPart("nutritionalInfo") String nutritionalInfo,
            @RequestPart("cookingInstructions") String cookingInstructions,
            @RequestPart("images") List<MultipartFile> images,
            @RequestPart("dietaryPreference") String dietaryPreference,
            @RequestPart("ingredients") String ingredients
    ) {
        try {
            MealDto mealDto = new MealDto(recipe, description, portionSize, nutritionalInfo, cookingInstructions, images, dietaryPreference, ingredients);
            String responseMessage = mealService.create(mealDto);
            return ResponseEntity.ok(responseMessage);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    @GetMapping("/meals")
    public ResponseEntity<List<Meal>> getAllMeals(@RequestParam(required = false) String dietaryPreference) {
        List<Meal> meals = mealService.getAllMeals(dietaryPreference);
        return ResponseEntity.ok(meals);
    }

    @GetMapping("/meals/getallmealdetails")
public ResponseEntity<List<Meal>> getAllMealDetails() {
    List<Meal> meals = mealService.getAllMealDetails();
    return ResponseEntity.ok(meals);
    
}

@GetMapping("/meals/{mealId}/data")
public ResponseEntity<UpdateMealDto> getMealData(@PathVariable Long mealId) {
    try {
        UpdateMealDto meal = mealService.getUpdateMealById(mealId);
        if (meal == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(meal);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    }
}







   

    @GetMapping("/meals/{mealId}/images")
    public ResponseEntity<List<byte[]>> getMealImages(@PathVariable Long mealId) {
        Meal meal = mealService.getMealById(mealId);
        if (meal == null || meal.getImageData().isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        List<byte[]> imageData = meal.getImageData();
        return ResponseEntity.ok(imageData);
    }

    @DeleteMapping("/meals/{mealId}")
    public ResponseEntity<String> deleteMeal(@PathVariable Long mealId) {
        try {
            mealService.deleteMeal(mealId);
            return ResponseEntity.ok("Meal deleted successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

   

    @PutMapping("/meals/{mealId}")
    public ResponseEntity<String> updateMeal(
            @PathVariable Long mealId,
            @RequestPart("recipe") String recipe,
            @RequestPart("description") String description,
            @RequestPart("portionSize") String portionSize,
            @RequestPart("nutritionalInfo") String nutritionalInfo,
            @RequestPart("cookingInstructions") String cookingInstructions,
            @RequestPart("dietaryPreference") String dietaryPreference,
            @RequestPart("ingredients") String ingredients
    ) {
        try {
            UpdateMealDto mealD = new UpdateMealDto(recipe, description, portionSize, nutritionalInfo, cookingInstructions, dietaryPreference, ingredients);
            mealService.updateMeal(mealId, mealD);
            return ResponseEntity.ok("Meal updated successfully");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
        }
    }

    // @PutMapping("/meals/{mealId}")
    // public ResponseEntity<String> updateMeal(@PathVariable Long mealId, @RequestBody MealDto mealDto) {
    //     try {
    //         mealService.updateMeal(mealId, mealDto);
    //         return ResponseEntity.ok("Meal updated successfully");
    //     } catch (IllegalArgumentException e) {
    //         return ResponseEntity.badRequest().body(e.getMessage());
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred");
    //     }
    // }

}
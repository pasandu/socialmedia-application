package com.example.gymapi.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.gymapi.model.Meal;

public interface MealRepository extends JpaRepository<Meal,Long> {

    List<Meal> findByDietaryPreference(String dietaryPreference);
    
     
    @Query("SELECT m FROM Meal m WHERE (:dietaryPreference IS NULL OR m.dietaryPreference = :dietaryPreference)")
    List<Meal> findByCustomDietaryPreference(@Param("dietaryPreference") String dietaryPreference);

}

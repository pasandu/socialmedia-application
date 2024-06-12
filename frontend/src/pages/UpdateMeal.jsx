// UpdateMeal.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const UpdateMeal = () => {
  const { mealId } = useParams();
  const [meal, setMeal] = useState({
    recipe: '',
    description: '',
    portionSize: '',
    nutritionalInfo: '',
    cookingInstructions: '',
    dietaryPreference: '',
    ingredients: '',
  });

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/meals/${mealId}/data`);
        setMeal(response.data);
      } catch (error) {
        console.error('Error fetching meal:', error);
      }
    };
    fetchMeal();
  }, [mealId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({
      ...meal,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/meals/${mealId}`, meal);
      alert('Meal updated successfully!');
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  return (
    <div>
      <h2>Update Meal</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="recipe">Recipe:</label>
          <input type="text" id="recipe" name="recipes" value={meal.recipe} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input type="text" id="description" name="descriptions" value={meal.description} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="portionSize">Portion Size:</label>
          <input type="text" id="portionSize" name="portionSizes" value={meal.portionSize} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="nutritionalInfo">Nutritional Info:</label>
          <input type="text" id="nutritionalInfo" name="nutritionalInfos" value={meal.nutritionalInfo} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="cookingInstructions">Cooking Instructions:</label>
          <input type="text" id="cookingInstructions" name="cookingInstruction" value={meal.cookingInstructions} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="dietaryPreference">Dietary Preference:</label>
          <input type="text" id="dietaryPreference" name="dietaryPreferences" value={meal.dietaryPreference} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor="ingredients">Ingredients:</label>
          <input type="text" id="ingredients" name="ingredients" value={meal.ingredients} onChange={handleChange} />
        </div>
        <button type="submit"></button>
      </form>
    </div>
  );
};

export default UpdateMeal;

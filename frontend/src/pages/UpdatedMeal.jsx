import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarLayout from "../components/SidebarLayout";

const UpdatedMeal = () => {
  const [meal, setMeal] = useState(null);
  const [showAlert, setShowAlert] = useState(false); // State to manage the display of the alert
  const { mealId } = useParams();

  useEffect(() => {
    const fetchMealData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/meals/${mealId}/data`);
        setMeal(response.data);
      } catch (error) {
        console.error('Error fetching meal data:', error);
      }
    };

    fetchMealData();
  }, [mealId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const portionSize = formData.get('portionSize');
    // Check if portionSize is a valid number
    if (isNaN(portionSize)) {
      alert('Portion Size must be a number!');
      return;
    }
    try {
      await axios.put(`http://localhost:8080/meals/${mealId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Meal updated successfully');
      setShowAlert(true); // Set showAlert to true after successfully updating the meal
    } catch (error) {
      console.error('Error updating meal:', error);
    }
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className="App">
      <SidebarLayout />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center mb-4">Update Meal</h2>
                {showAlert && (
                  <div className="alert alert-success" role="alert">
                    Meal updated successfully!
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="recipe" className="form-label">Recipe:</label>
                    <input type="text" className="form-control" id="recipe" name="recipe" defaultValue={meal.recipe} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description:</label>
                    <textarea className="form-control" id="description" name="description" defaultValue={meal.description}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="portionSize" className="form-label">Portion Size:</label>
                    <input type="text" className="form-control" id="portionSize" name="portionSize" defaultValue={meal.portionSize} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="nutritionalInfo" className="form-label">Nutritional Info:</label>
                    <textarea className="form-control" id="nutritionalInfo" name="nutritionalInfo" defaultValue={meal.nutritionalInfo}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="cookingInstructions" className="form-label">Cooking Instructions:</label>
                    <textarea className="form-control" id="cookingInstructions" name="cookingInstructions" defaultValue={meal.cookingInstructions}></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="dietaryPreference" className="form-label">Dietary Preference:</label>
                    <input type="text" className="form-control" id="dietaryPreference" name="dietaryPreference" defaultValue={meal.dietaryPreference} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="ingredients" className="form-label">Ingredients:</label>
                    <textarea className="form-control" id="ingredients" name="ingredients" defaultValue={meal.ingredients}></textarea>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Update Meal</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdatedMeal;

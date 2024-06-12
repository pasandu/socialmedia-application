import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import SidebarLayout from "../components/SidebarLayout";

const MealPlanItem = ({ meal }) => {
  return (
    <div className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        {meal.imageData && <img className="card-img-top" src={`data:image/jpeg;base64,${meal.imageData}`} alt="Prepared Meal" />}
        <div className="card-body">
          <h4 className="card-title">{meal.recipe}</h4>
          <p className="card-text"><strong>Description:</strong> {meal.description}</p>
          <p className="card-text"><strong>Portion Size (grams):</strong> {meal.portionSize}</p>
          <p className="card-text"><strong>Nutritional Info:</strong> {meal.nutritionalInfo}</p>
          <p className="card-text"><strong>Cooking Instructions:</strong> {meal.cookingInstructions}</p>
          <p className="card-text"><strong>Dietary Preference:</strong> {meal.dietaryPreference}</p>
          <p className="card-text"><strong>Ingredients:</strong> {meal.ingredients}</p>
        </div>
      </div>
    </div>
  );
};

const MealPlanCreator = () => {
  const [newPlan, setNewPlan] = useState({
    recipe: '',
    description: '',
    portionSize: '',
    nutritionalInfo: '',
    cookingInstructions: '',
    images: null,
    dietaryPreference: 'Vegetarian',
    ingredients: ''
  });
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Check if the entered value is a number for the portionSize field
    if (name === 'portionSize' && isNaN(value)) {
      // Display an error message or handle invalid input
      // For now, let's clear the input value
      setNewPlan({ ...newPlan, portionSize: '' });
    } else {
      setNewPlan({ ...newPlan, [name]: value });
    }
  };

  const handleImageChange = (e) => {
    setNewPlan({ ...newPlan, images: e.target.files });
  };

  const handleAddPlan = async () => {
    try {
      const formData = new FormData();
      formData.append('recipe', newPlan.recipe);
      formData.append('description', newPlan.description);
      formData.append('portionSize', newPlan.portionSize);
      formData.append('nutritionalInfo', newPlan.nutritionalInfo);
      formData.append('cookingInstructions', newPlan.cookingInstructions);
      if (newPlan.images) {
        for (let i = 0; i < newPlan.images.length; i++) {
          formData.append('images', newPlan.images[i]);
        }
      }
      formData.append('dietaryPreference', newPlan.dietaryPreference);
      formData.append('ingredients', newPlan.ingredients);

      const response = await axios.post('http://localhost:8080/meals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setSuccessMessage('Meal plan added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error creating meal plan:', error);
    }
  };

  const resetForm = () => {
    setNewPlan({
      recipe: '',
      description: '',
      portionSize: '',
      nutritionalInfo: '',
      cookingInstructions: '',
      images: null,
      dietaryPreference: 'Vegetarian',
      ingredients: ''
    });
  };

  return (
    <div className="App">
      <SidebarLayout />
      <div className="container">
        <h2 className="mt-5 mb-5 text-center">Add Your Meal Plan</h2>
        {successMessage && <div className="alert alert-success">{successMessage}</div>}
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form>
              <div className="form-group">
                <label>Recipe:</label>
                <input type="text" className="form-control" name="recipe" value={newPlan.recipe} onChange={handleInputChange} placeholder="Recipe" />
              </div>
              <div className="form-group">
                <label>Description:</label>
                <textarea className="form-control" name="description" value={newPlan.description} onChange={handleInputChange} placeholder="Description"></textarea>
              </div>
              <div className="form-group">
                <label>Portion Size (grams):</label>
                <input type="text" className="form-control" name="portionSize" value={newPlan.portionSize} onChange={handleInputChange} placeholder="Portion Size (grams)" />
              </div>
              <div className="form-group">
                <label>Nutritional Info:</label>
                <input type="text" className="form-control" name="nutritionalInfo" value={newPlan.nutritionalInfo} onChange={handleInputChange} placeholder="Nutritional Info" />
              </div>
              <div className="form-group">
                <label>Cooking Instructions:</label>
                <textarea className="form-control" name="cookingInstructions" value={newPlan.cookingInstructions} onChange={handleInputChange} placeholder="Cooking Instructions"></textarea>
              </div>
              <div className="form-group">
                <label>Images:</label>
                <input type="file" className="form-control" name="images" multiple onChange={handleImageChange} />
              </div>
              <div className="form-group">
                <label>Dietary Preference:</label>
                <select className="form-control" name="dietaryPreference" value={newPlan.dietaryPreference} onChange={handleInputChange}>
                  <option value="Vegetarian">Vegetarian</option>
                  <option value="Vegan">Vegan</option>
                  <option value="Keto">Keto</option>
                </select>
              </div>
              <div className="form-group">
                <label>Ingredients:</label>
                <textarea className="form-control" name="ingredients" value={newPlan.ingredients} onChange={handleInputChange} placeholder="Ingredients"></textarea>
              </div>
              <button type="button" className="btn btn-primary" onClick={handleAddPlan}>Add Plan</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealPlanCreator;

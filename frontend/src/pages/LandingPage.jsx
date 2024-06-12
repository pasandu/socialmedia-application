import React, { useState, useEffect } from 'react';
import "../css/SideBar.css";
import SidebarLayout from "../components/SidebarLayout";
import axios from 'axios';

const Meal = ({ recipe, description, portionSize, nutritionalInfo, cookingInstructions, mealId, dietaryPreference, ingredients,handleDietaryPreferenceClick }) => {
  const [imageUrls, setImageUrls] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/meals/${mealId}/images`);
        const base64Images = response.data;
        const urls = base64Images.map(base64 => `data:image/jpeg;base64,${base64}`);
        setImageUrls(urls);
      } catch (error) {
        console.error('Error fetching meal images:', error);
      }
    };
    fetchImages();
  }, [mealId]);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([...comments, newComment.trim()]);
      setNewComment('');
    }
  };

  return (
    <div className="shadow mb-5 mt-3 bg-light rounded" style={{ width: '700px', height: 'auto', marginLeft: '40px' }}>
      <div className="p-3">
        {/* Recipe */}
        <h4 className="card-title">{recipe}</h4>

        {/* Image Grid */}
        <div className="d-flex flex-wrap justify-content-center">
          {imageUrls.map((imageUrl, index) => (
            <div key={index} className="m-2">
              <img
                src={imageUrl}
                alt={`Meal ${index}`}
                className="img-fluid rounded"
                style={{ maxHeight: '300px', maxWidth: '400px' }}
              />
            </div>
          ))}
        </div>

        {/* Description */}
        <p className="card-text"><strong>Description:</strong> {description}</p>
        {/* Portion Size */}
        <p className="card-text"><strong>Portion Size (grams):</strong> {portionSize}</p>
        {/* Nutritional Info */}
        <p className="card-text"><strong>Nutritional Info:</strong> {nutritionalInfo}</p>
        {/* Cooking Instructions */}
        <p className="card-text"><strong>Cooking Instructions:</strong> {cookingInstructions}</p>
        {/* Dietary Preference */}
        <p className="card-text"><strong>Dietary Preference:</strong> {dietaryPreference}</p>
        {/* Ingredients */}
        <p className="card-text"><strong>Ingredients:</strong> {ingredients}</p>

        {/* Like and Comment Section */}
        <div className="mt-3 d-flex align-items-center">
          <button className="btn btn-primary mr-2" onClick={handleLike}>
            <i className="fas fa-thumbs-up"></i> Like ({likes})
          </button>

          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit} className="d-flex flex-grow-1 mx-3">
            <div className="form-group mb-0 flex-grow-1 mr-2">
              <input
                type="text"
                className="form-control"
                placeholder="Write a comment..."
                value={newComment}
                onChange={handleCommentChange}
              />
            </div>
            {/* Share Button */}
            <button type="button" className="btn btn-secondary" style={{ marginLeft: "15px" }}>
              <i className="fas fa-share"></i> Share
            </button>
          </form>
        </div>

        {/* Comments List */}
        {comments.length > 0 && (
          <div className="mt-3">
            <h6>Comments:</h6>
            <ul className="list-unstyled">
              {comments.map((comment, index) => (
                <li key={index} className="mb-2">
                  {comment}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default function MealList() {
  const [meals, setMeals] = useState([]);
  const [selectedDietaryPreference, setSelectedDietaryPreference] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/meals', {
          params: {
            dietaryPreference: selectedDietaryPreference
          }
        });
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, [selectedDietaryPreference]);

  const handleDietaryPreferenceClick = (preference) => {
    if (preference === 'All') {
      setSelectedDietaryPreference(null); // or you can set it to an empty string if needed
    } else {
      setSelectedDietaryPreference(preference);
    }
  };

  return (
    <div className="App">
      <SidebarLayout />

      <div className="content" style={{ marginTop: "60px", marginLeft: "350px" }}>
        <div className="mt-4">
          <div className="d-flex">
            <div className="">
              <div className="shadow p-3 mb-5 rounded" style={{ width: "840px", height: "auto", backgroundColor: "#e6e6e6" }}>
                {meals.map((meal) => (
                  <Meal
                    key={meal.id}
                    recipe={meal.recipe}
                    description={meal.description}
                    portionSize={meal.portionSize}
                    nutritionalInfo={meal.nutritionalInfo}
                    cookingInstructions={meal.cookingInstructions}
                    mealId={meal.id}
                    dietaryPreference={meal.dietaryPreference}
                    ingredients={meal.ingredients}
                    handleDietaryPreferenceClick={handleDietaryPreferenceClick}
                  />
                ))}
              </div>
            </div>

            <div>
            <div className="shadow mb-5 mt-3 bg-light rounded" style={{ width: '700px', height: 'auto', marginLeft: '40px' }}>
                <h2>Meal Categories</h2>
                <div className="p-3">
                <div className="mb-3">
          <button className="btn btn-outline-primary mr-2" onClick={() => handleDietaryPreferenceClick('All')}>
            All
          </button>
          <button className="btn btn-outline-primary mr-2" onClick={() => handleDietaryPreferenceClick('vegan')}>
            Vegan
          </button>
          <button className="btn btn-outline-primary mr-2" onClick={() => handleDietaryPreferenceClick('vegetarian')}>
            Vegetarian
          </button>
          <button className="btn btn-outline-primary mr-2" onClick={() => handleDietaryPreferenceClick('keto')}>
            Keto
          </button>
        </div>
                </div>
                {/* Add other meal categories or relevant information */}
              </div>

              <div className="shadow p-3 mb-5 rounded" style={{ width: "300px", height: "500px", marginLeft: "155px", backgroundColor: "#e6e6e6" }}>
                {/* Add additional content or components related to meals */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
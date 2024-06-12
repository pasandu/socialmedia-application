import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SidebarLayout from "../components/SidebarLayout";

const Meal = ({ recipe, description, portionSize, nutritionalInfo, cookingInstructions, mealId, dietaryPreference, ingredients, onDelete, onUpdate }) => {
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

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this meal?');
    if (confirmDelete) {
      onDelete(mealId);
    }
  };

  const handleUpdate = () => {
    onUpdate(mealId);
  };

  return (
    <div className="shadow mb-5 mt-3 bg-light rounded" style={{ width: '700px', height: 'auto', marginLeft: '40px' }}>
      <div className="p-3">
        <h4 className="card-title">{recipe}</h4>

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

        <p className="card-text"><strong>Description:</strong> {description}</p>
        <p className="card-text"><strong>Portion Size (grams):</strong> {portionSize}</p>
        <p className="card-text"><strong>Nutritional Info:</strong> {nutritionalInfo}</p>
        <p className="card-text"><strong>Cooking Instructions:</strong> {cookingInstructions}</p>
        <p className="card-text"><strong>Dietary Preference:</strong> {dietaryPreference}</p>
        <p className="card-text"><strong>Ingredients:</strong> {ingredients}</p>

        <div className="mt-3 d-flex align-items-center">
          <button className="btn btn-primary mr-2" onClick={handleLike}>
            <i className="fas fa-thumbs-up"></i> Like ({likes})
          </button>

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
            <button type="button" className="btn btn-secondary" style={{marginLeft:"15px"}}>
              <i className="fas fa-share"></i> Share
            </button>
          </form>

          <div>
            <button className="btn btn-danger mr-2" onClick={handleDelete}>
              Delete
            </button>
            <Link to={`/meals/${mealId}/update`} className="btn btn-primary">
              Edit
            </Link>
          </div>
        </div>

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

export default function Profile() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get('http://localhost:8080/meals/getallmealdetails');
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleDeleteMeal = async (mealId) => {
    try {
      await axios.delete(`http://localhost:8080/meals/${mealId}`);
      setMeals(meals.filter(meal => meal.id !== mealId));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleUpdateMeal = async (mealId) => {
    console.log('Update meal with id:', mealId);
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
                    onDelete={handleDeleteMeal}
                    onUpdate={handleUpdateMeal}
                  />
                ))}
              </div>
            </div>

            <div>
            <div className="shadow p-3 mb-5 rounded" style={{ width: "300px", height: "500px", marginLeft: "155px", backgroundColor: "#e6e6e6" }}>
  <h2>Your Profile</h2>
  <div style={{ textAlign: "center", marginTop: "20px" }}>
    <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cHJvZmlsZSUyMHBpY3R1cmV8ZW58MHx8MHx8fDA%3D" alt="Profile" style={{ width: "150px", height: "150px", borderRadius: "50%" }} />
  </div>
  {/* Add additional content or components related to the profile */}
</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

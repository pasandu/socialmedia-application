// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const EditMealPage = ({ match }) => {
//   const [meal, setMeal] = useState({
//     recipe: '',
//     description: '',
//     portionSize: '',
//     nutritionalInfo: '',
//     cookingInstructions: '',
//     dietaryPreference: '',
//     ingredients: ''
//   });

//   useEffect(() => {
//     const fetchMeal = async () => {
//       try {
//         const response = await axios.get(`http://localhost:8080/meals/${match.params.mealId}/data`);
//         setMeal(response.data);
//       } catch (error) {
//         console.error('Error fetching meal:', error);
//       }
//     };
//     fetchMeal();
//   }, [match.params.mealId]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setMeal({ ...meal, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:8080/meals/${match.params.mealId}`, meal);
//       // Redirect or show success message
//     } catch (error) {
//       console.error('Error updating meal:', error);
//     }
//   };


//   return (
//     <div className="container">
//       <h2>Edit Meal</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Recipe:</label>
//           <input type="text" className="form-control" name="recipe" value={meal.recipe} onChange={handleInputChange} />
//         </div>
//         <div className="form-group">
//           <label>Description:</label>
//           <textarea className="form-control" name="description" value={meal.description} onChange={handleInputChange}></textarea>
//         </div>
//         {/* Add other form fields */}
//         <button type="submit" className="btn btn-primary">Update</button>
//       </form>
//     </div>
//   );
// };

// export default EditMealPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Meal = ({ meal, onDelete, onUpdate }) => {
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Fetch likes, comments, etc. if needed
  }, []);

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
    onDelete(meal.id);
  };

  const handleUpdate = () => {
    onUpdate(meal.id);
  };

  return (
    <div>
      <h4>{meal.recipe}</h4>
      {/* Display other meal details */}
      <button onClick={handleLike}>Like ({likes})</button>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button type="submit">Comments</button>
      </form>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/meals/${meal.id}/edit`}>Updates</Link>
    </div>
  );
};

const Profile = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await axios.get();
        setMeals(response.data);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };

    fetchMeals();
  }, []);

  const handleDeleteMeal = async (mealId) => {
    try {
      await axios.delete(``);
      setMeals(meals.filter(meal => meal.id !== mealId));
    } catch (error) {
      console.error('Error deleting meal:', error);
    }
  };

  const handleUpdateMeal = async (mealId) => {
    // Add logic to navigate to the update page or show a modal
    console.log('Update meal with id:', mealId)
  };

  return (
    <div>
      <h1>edit meal plan</h1>
      {meals.map((meal) => (
        <Meal
          key={meal.id}
          meal={meal}
          onDelete={handleDeleteMeal}
          onUpdate={handleUpdateMeal}
        />
      ))}
    </div>
  );
};

export default Profile;


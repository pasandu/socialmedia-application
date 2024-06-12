import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealImages = ({ mealId }) => {
  const [images, setImages] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/meals/${mealId}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching meal images:', error);
      }
    };

    fetchImages();
  }, [mealId]);

  const handleLike = () => {
    setLikes(likes + 1); // You might want to implement actual like functionality on the server side
  };

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        // Assuming you have a backend endpoint for adding comments
        await axios.post(`http://localhost:8080/meals/${mealId}/comments`, { comment: newComment });
        setComments([...comments, newComment.trim()]);
        setNewComment('');
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  return (
    <div>
      <h2>Meal Images</h2>
      <div className="image-container">
        {images.map((image, index) => (
          <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Image ${index}`} />
        ))}
      </div>
      <div>
        <button onClick={handleLike}>Like</button>
        <span>{likes} Likes</span>
      </div>
      <div>
        <form onSubmit={handleCommentSubmit}>
          <input type="text" value={newComment} onChange={handleCommentChange} />
          <button type="submit">Comment</button>
        </form>
        <ul>
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MealImages;

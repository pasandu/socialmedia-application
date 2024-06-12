import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealImages = ({ mealId }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMealImages = async () => {
      try {
        const response = await axios.get(`/meals/${mealId}/images`);
        setImages(response.data);
      } catch (err) {
        setError(err.response.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (mealId) {
      fetchMealImages();
    } else {
      setLoading(false);
    }
  }, [mealId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (images.length === 0) {
    return <div>No images found for this meal.</div>;
  }

  return (
    <div>
      {images.map((imageData, index) => (
        <img
          key={index}
          src={`data:image/jpeg;base64,${btoa(
            String.fromCharCode.apply(null, imageData)
          )}`}
          alt={`Meal Image ${index + 1}`}
        />
      ))}
    </div>
  );
};

const MealContainer = () => {
  const [mealId, setMealId] = useState(null);

  useEffect(() => {
    // Fetch the mealId from an API or set it based on user input
    const fetchedMealId = 123; // Replace with your logic to fetch the mealId
    setMealId(fetchedMealId);
  }, []);

  return (
    <div>
      {mealId ? <MealImages mealId={mealId} /> : <div>Loading meal...</div>}
    </div>
  );
};

export default MealContainer;
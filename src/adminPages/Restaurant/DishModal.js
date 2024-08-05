import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DishModal.model.scss'; // Import SCSS file for styling
import { createAdminComboDish } from '../../redux/Restaurant/admincombodishSlice'; // Adjust import based on your setup
import { fetchDishData } from '../../redux/Restaurant/dishSlice'; // Adjust import based on your setup

export default function DishModal({ comboId, isOpen, onClose }) {
  const dispatch = useDispatch();
  
  // Ensure you use the right state slice
  const dishes = useSelector(state => state.dish.items); // State slice from dishSlice
  const status = useSelector(state => state.dish.status); // State slice from dishSlice
  const error = useSelector(state => state.dish.error); // State slice from dishSlice
  const createStatus = useSelector(state => state.adminComboDish.createStatus); // Adjust import based on your setup
  const createError = useSelector(state => state.adminComboDish.createError); // Adjust import based on your setup
  const comboDishes = useSelector(state => state.adminComboDish.adminComboDishes); // Fetch combo-dish associations
  
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen && status === 'idle') {
      dispatch(fetchDishData());
    }
  }, [dispatch, isOpen, status]);

  const handleAdd = (dishId) => {
    if (!comboId) {
      console.error("ComboId is missing");
      return;
    }

    // Check if the dish is already associated with the combo
    const isDuplicate = comboDishes.some(comboDish => comboDish.dishId === dishId);

    if (isDuplicate) {
      setErrorMsg('This dish is already associated with the combo.');
      return;
    }

    // Check if dishes is defined and not empty before checking if dish is already added
    if (dishes && dishes.length > 0) {
      // Check if dish is already added to the combo
      const isAlreadyAdded = dishes.some(dish => dish.comboId === comboId && dish.dishId === dishId);
      if (isAlreadyAdded) {
        alert("This dish is already added to the combo.");
        return;
      }
    }

    dispatch(createAdminComboDish({ comboId, dishId }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        {status === 'loading' && <div>Loading dishes...</div>}
        {status === 'failed' && <div>Error loading dishes: {error}</div>}
        {createStatus === 'loading' && <div>Creating combo-dish association...</div>}
        {createStatus === 'failed' && <div>Error creating combo-dish association: {createError}</div>}
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        {status === 'succeeded' && dishes && dishes.length > 0 && (
          <table className="dish-table">
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {dishes.map(dish => (
                <tr key={dish.id}>
                  <td>{dish.name}</td>
                  <td>${dish.price.toFixed(2)}</td>
                  <td>
                    <button className="add-button" onClick={() => handleAdd(dish.id)}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {status === 'succeeded' && (!dishes || dishes.length === 0) && <div>No dishes available.</div>}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DessertModal.model.scss'; // Import SCSS file for styling
import { createAdminComboDessert } from '../../redux/Restaurant/admincombodessertSlice';
import { fetchDessertData } from '../../redux/Restaurant/admindessertSlice';

export default function DessertModal({ comboId, isOpen, onClose }) {
  const dispatch = useDispatch();
  const desserts = useSelector(state => state.admindessert.items);
  const status = useSelector(state => state.admindessert.status);
  const error = useSelector(state => state.admindessert.error);
  const createStatus = useSelector(state => state.adminComboDessert.createStatus);
  const createError = useSelector(state => state.adminComboDessert.createError);
  const comboDesserts = useSelector(state => state.adminComboDessert.adminComboDesserts); // Fetch combo-appetizer associations
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen && status === 'idle') {
      dispatch(fetchDessertData());
    }
  }, [dispatch, isOpen, status]);

  const handleAdd = (dessertId) => {
    if (!comboId) {
      console.error("ComboId is missing");
      return;
    }

    // Check if the appetizer is already associated with the combo
    const isDuplicate = comboDesserts.some(
      comboDes => comboDes.dessertId === dessertId
    );

    if (isDuplicate) {
      setErrorMsg('This Dessert is already associated with the combo.');
      return;
    }

    // Check if desserts is defined and not empty before checking if dessert is already added
    if (desserts && desserts.length > 0) {
      // Check if dessert is already added to the combo
      const isAlreadyAdded = desserts.some(dessert => dessert.comboId === comboId && dessert.dessertId === dessertId);
      if (isAlreadyAdded) {
        alert("This dessert is already added to the combo.");
        return;
      }
    }


    dispatch(createAdminComboDessert({ comboId, dessertId }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        {status === 'loading' && <div>Loading desserts...</div>}
        {status === 'failed' && <div>Error loading desserts: {error}</div>}
        {createStatus === 'loading' && <div>Creating combo-dessert association...</div>}
        {createStatus === 'failed' && <div>Error creating combo-dessert association: {createError}</div>}
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        {status === 'succeeded' && desserts && desserts.length > 0 && (
          <table className="dessert-table">
            <thead>
              <tr>
                <th>Dessert Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {desserts.map(dessert => (
                <tr key={dessert.id}>
                  <td>{dessert.dessertName}</td>
                  <td>${dessert.price.toFixed(2)}</td>
                  <td>{dessert.quantity}</td>
                  <td>
                    <button className="add-button" onClick={() => handleAdd(dessert.id)}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {status === 'succeeded' && (!desserts || desserts.length === 0) && <div>No desserts available.</div>}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppetizerData } from '../../redux/Restaurant/adminappetizersSlice';
import { createAdminComboAppetizer } from '../../redux/Restaurant/admincomboappetizerSlice';
import './AppetizerModal.model.scss'; // Import SCSS file for styling

export default function AppetizerModal({ comboId, isOpen, onClose }) {
  const dispatch = useDispatch();
  const appetizers = useSelector(state => state.adminappetizer.items);
  const status = useSelector(state => state.adminappetizer.status);
  const error = useSelector(state => state.adminappetizer.error);
  const createStatus = useSelector(state => state.adminComboAppetizer.status);
  const createError = useSelector(state => state.adminComboAppetizer.error);
  const comboAppetizers = useSelector(state => state.adminComboAppetizer.adminComboAppetizers); // Fetch combo-appetizer associations

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen && status === 'idle') {
      dispatch(fetchAppetizerData());
    }
  }, [dispatch, isOpen, status]);

  const handleAdd = (appetizerId) => {
    if (!comboId) {
      console.error("ComboId is missing");
      return;
    }

      // Check if the appetizer is already associated with the current combo
    const isDuplicate = comboAppetizers.some(
      comboApp => comboApp.comboId === comboId && comboApp.appetizerId === appetizerId
    );
  
    if (isDuplicate) {
      setErrorMsg('This appetizer is already associated with the current combo.');
      return;
    }

    setErrorMsg(''); // Clear error message
    dispatch(createAdminComboAppetizer({ comboId, appetizerId }));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>Close</button>
        {status === 'loading' && <div>Loading appetizers...</div>}
        {status === 'failed' && <div>Error loading appetizers: {error}</div>}
        {createStatus === 'loading' && <div>Creating combo-appetizer association...</div>}
        {createStatus === 'failed' && <div>Error creating combo-appetizer association: {createError}</div>}
        {errorMsg && <div className="error-message">{errorMsg}</div>}
        {status === 'succeeded' && (
          <table className="appetizer-table">
            <thead>
              <tr>
                <th>Appetizer Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appetizers.map(appetizer => (
                <tr key={appetizer.id}>
                  <td>{appetizer.appetizerName}</td>
                  <td>${appetizer.price.toFixed(2)}</td>
                  <td>{appetizer.quantity}</td>
                  <td>
                    <button className="add-button" onClick={() => handleAdd(appetizer.id)}>Add</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

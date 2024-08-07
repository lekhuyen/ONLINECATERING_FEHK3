import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { FiSend } from 'react-icons/fi';
import { createAdminDessertItem } from '../../redux/Restaurant/admindessertSlice';

export default function CreateAdminDessert() {
    const [dessertName, setDessertName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [formFile, setFormFile] = useState(null); // State to hold the image file

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            // Dispatch the action to create a new dessert
            await dispatch(createAdminDessertItem({
                DessertName: dessertName,
                Price: parseFloat(price),
                Quantity: parseInt(quantity),
                formFile
            }));
    
            // Clear form fields
            setDessertName('');
            setPrice('');
            setQuantity('');
            setFormFile(null);
    
            // Navigate to the dessert list or any other desired location
            navigate('/dessert-admin'); // Example: navigate to the desserts list page
        } catch (error) {
            console.error('Error creating dessert:', error);
            // Handle error state or display error message to the user
        }
    };
    

    // Function to handle file input change
    const handleFileChange = (e) => {
        setFormFile(e.target.files[0]); // Assuming only a single file is allowed
    };

    const handleGoBack = () => {
        navigate('/dessert-admin'); // Navigate back to dessert list page
    };

    return (
        <div className="container">
            <h2>Create Dessert</h2>
            <div className="mt-3">
                <button className="btn btn-secondary" onClick={handleGoBack}>
                    <RiArrowGoBackLine /> Go Back
                </button>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="dessertName">Dessert Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dessertName"
                        value={dessertName}
                        onChange={(e) => setDessertName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        step="1" // Integer values for quantity
                        
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="formFile">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    <FiSend /> Create Dessert
                </button>
            </form>
        </div>
    );
}

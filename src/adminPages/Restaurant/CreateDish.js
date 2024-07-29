import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { createDishItem } from '../../redux/Restaurant/dishSlice';

export default function CreateDish() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [formFile, setFormFile] = useState(null); // State to hold the image file

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Dispatch the action to create a new dish with status defaulting to false (Inactive)
        dispatch(createDishItem({
            name,
            price: parseFloat(price),
            status: false, // Always false by default
            formFile
        })).unwrap() // unwrap to handle the promise
        .then(() => {
            // Clear form fields
            setName('');
            setPrice('');
            setFormFile(null);

            // Navigate to the dish list or any other desired location
            navigate('/dish-admin'); // Example: navigate to the dishes list page
        })
        .catch((error) => {
            console.error('Error creating dish:', error);
            // Handle error state or display error message to the user
        });
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setFormFile(e.target.files[0]); // Assuming only a single file is allowed
    };

    return (
        <div className="container">
            <h2>Create Dish</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                        step="0.01" // Allows decimal prices
                    />
                </div>

                {/* Hidden Status Field */}
                <input type="hidden" value={false} />

                <div className="form-group">
                    <label htmlFor="formFile">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        onChange={handleFileChange}
                    />
                </div>

                <button type="submit" className="btn btn-primary"><FiSend /> Create Dish</button>
            </form>
        </div>
    );
}
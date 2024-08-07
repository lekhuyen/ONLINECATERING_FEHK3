import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { createDishItem } from '../../redux/Restaurant/dishSlice';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function CreateDish() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [formFile, setFormFile] = useState(null); // State to hold the image file
    const [type, setType] = useState(''); // State to hold the type

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if name, price, and formFile are provided
        if (!name || !price || !formFile) {
            alert('Please provide all required fields.');
            return;
        }

        try {
            await dispatch(createDishItem({
                name,
                price: parseFloat(price),
                status: false, // Always false by default
                formFile
            })).unwrap();

            // Clear form fields
            setName('');
            setPrice('');
            setType('');
            setFormFile(null);
            navigate('/dish-admin'); 
        } catch (error) {
            console.error('Error creating dish:', error);
            // Handle error state or display error message to the user
        }
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setFormFile(e.target.files[0]); // Assuming only a single file is allowed
    };

    const handleGoBack = () => {
        navigate('/appetizer-admin'); // Navigate back to dessert list page
    };

    return (
        <div className="container">
            <h2>Create Dish</h2>
            <button className="btn btn-secondary" onClick={handleGoBack}>
                <RiArrowGoBackLine /> Go Back
            </button>
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
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="formFile">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary"><FiSend /> Create Dish</button>
            </form>
        </div>
    );
}

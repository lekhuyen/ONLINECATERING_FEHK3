// CreateAdminCombo.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { createComboItem } from '../../redux/Restaurant/comboSlice';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function CreateAdminCombo() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [formFile, setImageFile] = useState(null); // State to hold the image file
    const [type, setType] = useState(''); // State to hold the combo type

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch the action to create a new combo
        dispatch(createComboItem({
            name,
            price: parseFloat(price),
            status: false, // Always false by default
            type: parseInt(type), // Parse the type to integer
            formFile
        })).unwrap() // unwrap to handle the promise
        .then(() => {
            // Clear form fields
            setName('');
            setPrice('');
            setImageFile(null);
            setType('');

            // Navigate to the admin combos list or any other desired location
            navigate('/combo-admin'); // Example: navigate to the admin combos list page
        })
        .catch((error) => {
            console.error('Error creating combo:', error);
            // Handle error state or display error message to the user
        });
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setImageFile(e.target.files[0]); // Assuming only a single file is allowed
    };

    const handleGoBack = () => {
        navigate("/combo-admin");
    };

    return (
        <div className="container">
            <h2>Create Admin Combo</h2>
            <div className="mt-3">
                <button className="btn btn-secondary" onClick={handleGoBack}><RiArrowGoBackLine /></button>
            </div>
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

                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="number"
                        className="form-control"
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
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

                <button type="submit" className="btn btn-primary"><FiSend /> Create Combo</button>
            </form>
        </div>
    );
}

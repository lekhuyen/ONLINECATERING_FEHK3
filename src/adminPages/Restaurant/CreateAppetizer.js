import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { createAdminAppetizerItem } from '../../redux/Restaurant/adminappetizersSlice';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function CreateAppetizer() {
    const [appetizerName, setAppetizerName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [formFile, setFormFile] = useState(null); // State to hold the image file
    const [loading, setLoading] = useState(false); // Loading state
    const [errors, setErrors] = useState({ // Validation states
        appetizerName: false,
        price: false,
        quantity: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Reset errors
        setErrors({
            appetizerName: false,
            price: false,
            quantity: false,
        });

        // Validation: Check for empty values and negative price
        let hasError = false;

        if (!appetizerName) {
            setErrors((prev) => ({ ...prev, appetizerName: true }));
            hasError = true;
        }

        if (!price || parseFloat(price) < 0) {
            setErrors((prev) => ({ ...prev, price: true }));
            hasError = true;
        }

        if (!quantity) {
            setErrors((prev) => ({ ...prev, quantity: true }));
            hasError = true;
        }

        if (hasError) {
            setLoading(false);
            return; // Exit if there are validation errors
        }

        // Dispatch the action to create a new appetizer
        dispatch(createAdminAppetizerItem({
            AppetizerName: appetizerName,
            Price: parseFloat(price),
            Quantity: parseInt(quantity),
            formFile
        })).unwrap() // unwrap to handle the promise
        .then(() => {
            // Clear form fields
            setAppetizerName('');
            setPrice('');
            setQuantity('');
            setFormFile(null);

            // Navigate to the appetizer list or any other desired location
            navigate('/appetizer-admin'); // Example: navigate to the appetizers list page
        })
        .catch((error) => {
            console.error('Error creating appetizer:', error);
            // Handle error state or display error message to the user
        })
        .finally(() => {
            setLoading(false); // End loading
        });
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
            <h2>Create Appetizer</h2>

            <button className="btn btn-secondary" onClick={handleGoBack}>
                <RiArrowGoBackLine /> Go Back
            </button>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="appetizerName">Appetizer Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.appetizerName ? 'is-invalid' : ''}`}
                        id="appetizerName"
                        value={appetizerName}
                        onChange={(e) => setAppetizerName(e.target.value)}
                        required
                    />
                    {errors.appetizerName && <div className="invalid-feedback">Appetizer name is required.</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                        step="0.01" // Allows decimal prices
                        min="0" // Prevent negative values
                    />
                    {errors.price && <div className="invalid-feedback">Price cannot be negative or empty.</div>}
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        min="0"
                        required
                    />
                    {errors.quantity && <div className="invalid-feedback">Quantity cannot be negative or empty.</div>}
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

                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? (
                        <span>Loading...</span> // Display loading message
                    ) : (
                        <>
                            <FiSend /> Create Appetizer
                        </>
                    )}
                </button>
            </form>

            {loading && <p>Submitting... Please wait.</p>} {/* Display loading message */}
        </div>
    );
}

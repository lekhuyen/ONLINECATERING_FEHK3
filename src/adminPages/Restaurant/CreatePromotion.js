
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { createPromotionItem } from '../../redux/Restaurant/promotionSlice';



export default function CreateAdminPromotion() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantityTable, setQuantityTable] = useState('');
    const [formFile, setFormFile] = useState(null); // State to hold the image file

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dispatch the action to create a new promotion
        dispatch(createPromotionItem({
            name,
            description,
            price: parseFloat(price),
            quantityTable: parseInt(quantityTable),
            status: false, // Default status
            imageFile: formFile
        })).unwrap() // unwrap to handle the promise
        .then(() => {
            // Clear form fields
            setName('');
            setDescription('');
            setPrice('');
            setQuantityTable('');
            setFormFile(null);

            // Navigate to the admin promotions list or any other desired location
            navigate('/promotion'); // Example: navigate to the admin promotions list page
        })
        .catch((error) => {
            console.error('Error creating promotion:', error);
            // Handle error state or display error message to the user
        });
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setFormFile(e.target.files[0]); // Assuming only a single file is allowed
    };

    return (
        <div className="container">
            <h2>Create Admin Promotion</h2>
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
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <label htmlFor="quantityTable">Quantity Table</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantityTable"
                        value={quantityTable}
                        onChange={(e) => setQuantityTable(e.target.value)}
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

                <button type="submit" className="btn btn-primary"><FiSend /> Create Promotion</button>
            </form>
        </div>
    );
}

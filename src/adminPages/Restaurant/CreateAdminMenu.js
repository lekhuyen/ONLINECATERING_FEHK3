import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createMenuItem } from '../../redux/Restaurant/adminmenuSlice'; // Adjust import based on your file structure
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function CreateAdminMenu() {
    const [menuName, setMenuName] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [file, setFile] = useState(null); // Add state for file

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('menuName', menuName);
        formData.append('ingredient', ingredient);
        formData.append('price', price);
        formData.append('quantity', quantity);
        if (file) {
            formData.append('formFile', file); // Append the file
        }

        try {
            // Dispatch createMenuItem action with form data
            await dispatch(createMenuItem(formData)).unwrap();

            // Clear form fields
            setMenuName('');
            setIngredient('');
            setPrice('');
            setQuantity('');
            setFile(null);

            // Navigate to another page or refresh
            navigate('/menu-admin'); // Adjust the navigation path as needed
        } catch (error) {
            console.error('Error creating menu item:', error);
            // Handle error state or display error message to the user
        }
    };

    const handleGoBack = () => {
        navigate('/menu-admin'); // Navigate back to the menu list page
    };

    return (
        <div className="container">
            <h2>Create Menu Item</h2>

            <button className="btn btn-secondary" onClick={handleGoBack}>
                <RiArrowGoBackLine /> Go Back
            </button>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="menuName">Menu Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="menuName"
                        value={menuName}
                        onChange={(e) => setMenuName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="ingredient">Ingredient</label>
                    <textarea
                        className="form-control"
                        id="ingredient"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        step="0.01" // Allows for decimal values
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
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
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="file">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    <FiSend /> Create Menu Item
                </button>
            </form>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuData, updateMenuItem } from '../../redux/Restaurant/adminmenuSlice'; // Adjust import based on your file structure
import { FiSend } from 'react-icons/fi';

export default function EditAdminMenu() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [menuName, setMenuName] = useState('');
    const [ingredient, setIngredient] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [restaurantId, setRestaurantId] = useState('');

    const menuItem = useSelector((state) => state.menu.items.find(item => item.id === Number(id))); // Convert id to number
    const status = useSelector((state) => state.menu.status);
    const error = useSelector((state) => state.menu.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchMenuData());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (menuItem) {
            setMenuName(menuItem.menuName || '');
            setIngredient(menuItem.ingredient || '');
            setPrice(menuItem.price.toString() || '');
            setQuantity(menuItem.quantity.toString() || '');
            setRestaurantId(menuItem.restaurantId.toString() || '');
        }
    }, [menuItem]);

    const handleUpdate = async () => {
        try {
            await dispatch(updateMenuItem({
                id: Number(id),
                menuName,
                ingredient,
                price: parseFloat(price), // Convert price to decimal
                quantity: parseInt(quantity, 10) // Convert quantity to integer
            })).unwrap();

            console.log('Menu item updated successfully');
            navigate('/menu-admin'); // Navigate back to Menu list page after successful update
        } catch (error) {
            console.error('Error updating menu item:', error);
        }
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit Menu Item</h2>
            <form>
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
                        rows="3"
                        value={ingredient}
                        onChange={(e) => setIngredient(e.target.value)}
                    />
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
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="restaurantId">Restaurant</label>
                    <input
                        type="number"
                        className="form-control"
                        id="restaurantId"
                        value={restaurantId}
                        onChange={(e) => setRestaurantId(e.target.value)}
                        hidden
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                >
                    <FiSend /> Save Changes
                </button>
            </form>
        </div>
    );
}

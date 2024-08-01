// AdminRestaurant.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAdminRestaurantData, editRestaurantItems } from '../../redux/Restaurant/adminrestaurantSlice';
import './AdminRestaurant.scss'; // Import SCSS file

export default function AdminRestaurant() {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.adminrestaurant.restaurants);
    const adminRestaurantStatus = useSelector((state) => state.adminrestaurant.status);
    const error = useSelector((state) => state.adminrestaurant.error);

    useEffect(() => {
        dispatch(fetchAdminRestaurantData());
    }, [dispatch]);

    const [editingRestaurantId, setEditingRestaurantId] = useState(null);
    const [editedRestaurantData, setEditedRestaurantData] = useState({
        id: null,
        restaurantName: '',
        city: '',
        address: '',
        open: new Date(), // Initialize as Date object
        close: new Date(), // Initialize as Date object
        categoryId: null, // Initialize categoryId
    });

    const handleEditStart = (restaurant) => {
        setEditingRestaurantId(restaurant.id);
        // Parse ISO strings for 'open' and 'close' into Date objects
        const openDate = new Date(restaurant.open);
        const closeDate = new Date(restaurant.close);
        
        setEditedRestaurantData({
            ...restaurant,
            open: openDate,
            close: closeDate,
            categoryId: restaurant.categoryId, // Ensure categoryId is included
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedRestaurantData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSave = () => {
        // Validate that all required fields are present before dispatching the edit action
        if (!editedRestaurantData.address || editedRestaurantData.categoryId === null) {
            console.error('Address and Category are required fields.');
            // You can handle this error state or display a notification to the user
            return;
        }
    
        // Convert 'open' and 'close' Date objects to ISO string for sending to API
        const formattedData = {
            ...editedRestaurantData,
            open: editedRestaurantData.open.toISOString(),
            close: editedRestaurantData.close.toISOString(),
        };
    
        dispatch(editRestaurantItems(formattedData))
            .then(() => {
                setEditingRestaurantId(null);
                setEditedRestaurantData({
                    id: null,
                    restaurantName: '',
                    city: '',
                    address: '', // Ensure address is reset if needed
                    open: new Date(), // Reset to initial state
                    close: new Date(), // Reset to initial state
                    categoryId: null, // Reset categoryId if needed
                });
            })
            .catch(error => {
                console.error('Error saving changes:', error);
                // Handle error state or display a notification
            });
    };

    if (adminRestaurantStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (adminRestaurantStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="admin-restaurant-container">
            <h2>Admin Restaurant Management</h2>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>City</th>
                        <th>Address</th>
                        <th>Open</th>
                        <th>Close</th>
                        <th>Category</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants.map(restaurant => (
                        <tr key={restaurant.id}>
                            <td>{restaurant.id}</td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <input
                                        type="text"
                                        name="restaurantName"
                                        value={editedRestaurantData.restaurantName}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    restaurant.restaurantName
                                )}
                            </td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <input
                                        type="text"
                                        name="city"
                                        value={editedRestaurantData.city}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    restaurant.city
                                )}
                            </td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <input
                                        type="text"
                                        name="address"
                                        value={editedRestaurantData.address}
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    restaurant.address
                                )}
                            </td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <input
                                        type="time"
                                        name="open"
                                        value={editedRestaurantData.open.toISOString().substr(11, 5)} // Display only HH:mm
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    restaurant.open.substr(11, 5) // Display only HH:mm
                                )}
                            </td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <input
                                        type="time"
                                        name="close"
                                        value={editedRestaurantData.close.toISOString().substr(11, 5)} // Display only HH:mm
                                        onChange={handleInputChange}
                                    />
                                ) : (
                                    restaurant.close.substr(11, 5) // Display only HH:mm
                                )}
                            </td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <input
                                        type="text"
                                        name="categoryName"
                                        value={restaurant.categoryName}
                                        disabled // Display categoryName as disabled input field
                                    />
                                ) : (
                                    restaurant.categoryName
                                )}
                            </td>
                            <td>
                                {editingRestaurantId === restaurant.id ? (
                                    <button className="btn btn-success mr-2" onClick={handleSave}>
                                        Save
                                    </button>
                                ) : (
                                    <button className="btn btn-primary mr-2" onClick={() => handleEditStart(restaurant)}>
                                        Edit
                                    </button>
                                )}
                                {/* You can add a delete button here if needed */}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

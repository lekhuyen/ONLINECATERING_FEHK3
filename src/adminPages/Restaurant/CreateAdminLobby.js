import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createLobbyItem } from '../../redux/Restaurant/adminlobbySlice'; // Adjust import based on your file structure
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function CreateAdminLobby() {
    const [lobbyName, setLobbyName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make sure to pass the data as an object with the expected fields
            await dispatch(createLobbyItem({
                lobbyName,
                description,
                area,
                type: parseInt(type, 10), // Convert type to integer
                price: parseFloat(price)  // Convert price to float
            })).unwrap();

            // Clear form fields
            setLobbyName('');
            setDescription('');
            setArea('');
            setType('');
            setPrice('');

            // Navigate to another page or refresh
            navigate('/lobby-admin');
        } catch (error) {
            console.error('Error creating lobby:', error);
            // Handle error state or display error message to the user
        }
    };

    const handleGoBack = () => {
        navigate('/lobby-admin'); // Navigate back to dessert list page
    };

    return (
        <div className="container">
            <h2>Create Lobby</h2>

                <button className="btn btn-secondary" onClick={handleGoBack}>
                    <RiArrowGoBackLine /> Go Back
                </button>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="lobbyName">Lobby Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="lobbyName"
                        value={lobbyName}
                        onChange={(e) => setLobbyName(e.target.value)}
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
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="area">Area</label>
                    <input
                        type="text"
                        className="form-control"
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        required
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

                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    <FiSend /> Create Lobby
                </button>
            </form>
        </div>
    );
}

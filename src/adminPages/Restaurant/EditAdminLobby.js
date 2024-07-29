import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLobbyData, updateLobbyItem } from '../../redux/Restaurant/adminlobbySlice'; // Adjust import based on your file structure

export default function EditAdminLobby() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [lobbyName, setLobbyName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');

    const lobbyItem = useSelector((state) => state.lobby.items.find(item => item.id === Number(id))); // Convert id to number
    const status = useSelector((state) => state.lobby.status);
    const error = useSelector((state) => state.lobby.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLobbyData());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (lobbyItem) {
            setLobbyName(lobbyItem.lobbyName || '');
            setDescription(lobbyItem.description || '');
            setArea(lobbyItem.area || '');
            setType(lobbyItem.type || '');
            setPrice(lobbyItem.price || '');
        }
    }, [lobbyItem]);

    const handleUpdate = async () => {
        try {
            await dispatch(updateLobbyItem({
                id: Number(id),
                lobbyName,
                description,
                area,
                type: parseInt(type, 10),
                price: parseFloat(price)
            })).unwrap();

            console.log('Lobby item updated successfully');
            navigate('/lobby-admin'); // Navigate back to Lobby list page after successful update
        } catch (error) {
            console.error('Error updating lobby item:', error);
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
            <h2>Edit Lobby</h2>
            <form>
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
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="area">Area</label>
                    <input
                        type="text"
                        className="form-control"
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
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
                    />
                </div>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleUpdate}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
}

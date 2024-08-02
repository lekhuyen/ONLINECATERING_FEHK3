import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import { fetchLobbies, updateLobby, fetchLobbyById } from '../../redux/Restaurant/adminlobbySlice';

export default function EditLobby() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [lobbyName, setLobbyName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [newImage, setNewImage] = useState(null);

    const lobby = useSelector((state) =>
        state.adminLobby.lobbies.find(lobby => lobby.id === Number(id))
    ); // Convert id to number
    const status = useSelector((state) => state.adminLobby.status);
    const error = useSelector((state) => state.adminLobby.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchLobbies());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (lobby) {
            console.log('Lobby data:', lobby); // Debugging: Check lobby data
            setLobbyName(lobby.lobbyName || '');
            setDescription(lobby.description || '');
            setArea(lobby.area || '');
            setType(lobby.type || '');
            setPrice(lobby.price || '');
            setImage(lobby.image || ''); // Set current image URL
        }
    }, [lobby]);

    // Fetch lobby details including images if id changes
    useEffect(() => {
        if (id) {
            dispatch(fetchLobbyById(id)).then((response) => {
                setImage(response.payload.imageUrl || ''); // Adjust based on your response structure
            }).catch((error) => {
                console.error('Error fetching lobby images:', error);
            });
        }
    }, [id, dispatch]);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNewImage(file);
        }
    };

    const handleUpdate = async () => {
        try {
            await dispatch(updateLobby({
                id: Number(id), // Ensure ID is correctly converted to a number
                lobbyName: lobbyName,
                description: description,
                area: area,
                type: type,
                price: price,
                formFile: newImage // Include the new image file if present
            })).unwrap();

            console.log('Lobby updated successfully');
            navigate('/lobby-admin');
        } catch (error) {
            console.error('Error updating lobby:', error);
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
                        type="text"
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
                <div className="form-group">
                    <label htmlFor="currentImage">Current Image</label>
                    {image ? (
                        <img
                            src={image}
                            alt="Lobby"
                            style={{
                                width: "100px",
                                height: "100px",
                                objectFit: "cover",
                            }}
                        />
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="form-group">
                    <label htmlFor="image">Upload New Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="image"
                        onChange={handleImageChange}
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

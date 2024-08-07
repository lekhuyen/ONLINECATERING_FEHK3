import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiSend } from 'react-icons/fi';
import { RiArrowGoBackLine } from 'react-icons/ri';
import { createLobby } from '../../redux/Restaurant/adminlobbySlice'; // Import the createLobby action

export default function CreateAdminLobby() {
    const [lobbyName, setLobbyName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [files, setFiles] = useState([]); // State to hold the selected image file

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append('lobbyName', lobbyName);
            formData.append('description', description);
            formData.append('area', area);
            formData.append('type', parseInt(type, 10));
            formData.append('price', parseFloat(price));
    
            files.forEach((file, index) => {
                formData.append('files', file); // Append each file to FormData
            });
    
            await dispatch(createLobby(formData)).unwrap(); // Dispatch createLobby action
    
            // Clear form fields and file state
            setLobbyName('');
            setDescription('');
            setArea('');
            setType('');
            setPrice('');
            setFiles([]); // Reset files state
    
            // Navigate to another page or refresh
            navigate('/lobby-admin');
        } catch (error) {
            console.error('Error creating lobby:', error);
            // Handle error state or display error message to the user
        }
    };

    const handleFileChange = (e) => {
        const filesArray = Array.from(e.target.files);
        setFiles(filesArray);
    };
    

    const handleGoBack = () => {
        navigate('/lobby-admin'); // Navigate back to lobby list page
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
                        min="0"
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
                        min="0"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Images</label>
                    <input
                        type="file"
                        className="form-control-file"
                        id="image"
                        onChange={handleFileChange}
                        accept="image/*" // Accept only image files
                        multiple // Allow multiple files
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    <FiSend /> Create Lobby
                </button>
            </form>
        </div>
    );
}

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiSend } from 'react-icons/fi';
import { fetchLobbies, updateLobby, fetchLobbyById } from '../../redux/Restaurant/adminlobbySlice';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function EditLobby() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    // State for form fields and file upload
    const [lobbyName, setLobbyName] = useState('');
    const [description, setDescription] = useState('');
    const [area, setArea] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [currentImages, setCurrentImages] = useState([]); // Array for images
    const [newImages, setNewImages] = useState([]); // Array for new images
    const [errors, setErrors] = useState({ // State for validation
        lobbyName: false,
        description: false,
        area: false,
        type: false,
        price: false,
    });

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
            setLobbyName(lobby.lobbyName || '');
            setDescription(lobby.description || '');
            setArea(lobby.area || '');
            setType(lobby.type || '');
            setPrice(lobby.price || '');
            setCurrentImages(lobby.lobbyImages?.$values?.map(img => img.imagesUrl) || []); // Set current images
        }
    }, [lobby]);

    useEffect(() => {
        if (id) {
            dispatch(fetchLobbyById(id))
                .unwrap()
                .then((response) => {
                    console.log('Lobby response:', response); // Debugging response
                    if (response.lobbyImages && response.lobbyImages.$values) {
                        const images = response.lobbyImages.$values.map(img => img.imagesUrl);
                        setCurrentImages(images || []); // Set current images
                    } else {
                        console.error('Lobby images data is missing or malformed:', response);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching lobby images:', error);
                });
        }
    }, [id, dispatch]);
    
    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        setNewImages(files);
    };

    const handleUpdate = async () => {
        // Reset errors
        setErrors({
            lobbyName: false,
            description: false,
            area: false,
            type: false,
            price: false,
        });

        // Validation: Check if fields are valid
        let hasError = false;

        if (!lobbyName) {
            setErrors(prev => ({ ...prev, lobbyName: true }));
            hasError = true;
        }

        if (!description) {
            setErrors(prev => ({ ...prev, description: true }));
            hasError = true;
        }

        if (!area) {
            setErrors(prev => ({ ...prev, area: true }));
            hasError = true;
        }

        if (!type) {
            setErrors(prev => ({ ...prev, type: true }));
            hasError = true;
        }

        if (!price || price < 0) {
            setErrors(prev => ({ ...prev, price: true }));
            hasError = true;
        }

        if (hasError) {

            return; 
        }

        try {
            const formData = new FormData();
            formData.append('id', id); // Ensure ID is included
            formData.append('lobbyName', lobbyName);
            formData.append('description', description);
            formData.append('area', area);
            formData.append('type', type);
            formData.append('price', price);
    
            newImages.forEach((file) => {
                formData.append('files', file); // Key must match backend parameter
            });
    
            const response = await dispatch(updateLobby(formData)).unwrap();
            console.log('Lobby updated successfully:', response);
    
            setCurrentImages(response.lobbyImages?.$values?.map(img => img.imagesUrl) || []);
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

    const handleGoBack = () => {
        navigate("/lobby-admin");
    };


    return (
        <div className='container'>
            <h2>Edit Lobby</h2>
            <button className="btn btn-secondary" onClick={handleGoBack}>
                <RiArrowGoBackLine /> Go Back
            </button>
            <form>
                <div className="form-group">
                    <label htmlFor="lobbyName">Lobby Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.lobbyName ? 'is-invalid' : ''}`}
                        id="lobbyName"
                        value={lobbyName}
                        onChange={(e) => setLobbyName(e.target.value)}
                        required
                    />
                    {errors.lobbyName && <div className="invalid-feedback">Lobby name is required.</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                        id="description"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <div className="invalid-feedback">Description is required.</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="area">Area</label>
                    <input
                        type="text"
                        className={`form-control ${errors.area ? 'is-invalid' : ''}`}
                        id="area"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                    {errors.area && <div className="invalid-feedback">Area is required.</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="type">Type</label>
                    <input
                        type="text"
                        className={`form-control ${errors.type ? 'is-invalid' : ''}`}
                        id="type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    />
                    {errors.type && <div className="invalid-feedback">Type is required.</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        min="0"
                    />
                    {errors.price && <div className="invalid-feedback">Price must be a positive number.</div>}
                </div>
                <div className="form-group">
                    <label htmlFor="currentImages">Current Images</label>
                    <div id="currentImages">
                        {currentImages.length > 0 ? (
                            currentImages.map((imgUrl, index) => {
                                console.log(`Fetching image from: ${imgUrl}`); // Debugging URL
                                return (
                                    <img
                                        key={index}
                                        src={imgUrl}
                                        alt={`Lobby ${index}`}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                            marginRight: "10px"
                                        }}
                                    />
                                );
                            })
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="formFile">Upload New Images</label>
                    <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        multiple
                        onChange={handleImageChange}
                    />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>
                    <FiSend /> Update Lobby
                </button>
            </form>
        </div>
    );
}

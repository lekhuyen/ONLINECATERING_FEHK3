import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDessertData, updateAdminDessertItem } from '../../redux/Restaurant/admindessertSlice';


export default function EditAdminDessert() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    // State for form fields and file upload
    const [dessertName, setDessertName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [formFile, setFormFile] = useState(null); // For handling file upload
    const [dessertImage, setDessertImage] = useState(''); // Current image path

    // Redux state
    const dessertStatus = useSelector((state) => state.admindessert.status);
    const dessertError = useSelector((state) => state.admindessert.error);
    const dessertItem = useSelector((state) => state.admindessert.items.find(item => item.id === Number(id)));

    useEffect(() => {
        if (dessertStatus === 'idle') {
            dispatch(fetchDessertData());
        }
    }, [dessertStatus, dispatch]);

    useEffect(() => {
        if (dessertItem) {
            setDessertName(dessertItem.dessertName || '');
            setPrice(dessertItem.price || '');
            setQuantity(dessertItem.quantity || '');
            setDessertImage(dessertItem.dessertImage || ''); // Set current image path
        }
    }, [dessertItem]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('DessertName', dessertName);
            formData.append('Price', price);
            formData.append('Quantity', quantity);

            if (formFile) {
                formData.append('formFile', formFile);
            }

            formData.append('imagePath', dessertImage); // Include current image path

            await dispatch(updateAdminDessertItem({
                id: Number(id),
                DessertName: dessertName,
                Price: price,
                Quantity: quantity,
                imagePath: dessertImage,
                formFile
            })).unwrap();

            console.log('Dessert item updated successfully');
            navigate('/dessert-admin'); // Navigate back to Dessert page after successful update
        } catch (error) {
            console.error('Error updating dessert item:', error);
        }
    };

    const handleImageChange = (e) => {
        setFormFile(e.target.files[0]); // Store the selected file for upload
    };

    if (dessertStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (dessertStatus === 'failed') {
        return <p>Error: {dessertError}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit Dessert</h2>
            <form>
                <div className="form-group">
                    <label>Dessert Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={dessertName}
                        onChange={(e) => setDessertName(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Current Image</label>
                    {dessertImage ? (
                        <div className="mb-2">
                            <img
                                src={dessertImage}
                                alt="Current"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        </div>
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Upload New Image</label>
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleImageChange}
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
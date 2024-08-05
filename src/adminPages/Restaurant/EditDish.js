import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDishData, updateDishItem } from '../../redux/Restaurant/dishSlice';

export default function EditDish() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [status, setStatus] = useState(true); // Assuming status is a boolean
    const [formFile, setFormFile] = useState(null); // For handling file upload
    const [imagePath, setImagePath] = useState(''); // Initialize as a string

    // Rename the status from Redux state to avoid conflict
    const dishStatus = useSelector((state) => state.dish.status);
    const dishError = useSelector((state) => state.dish.error);
    const dishItem = useSelector((state) => state.dish.items.find(item => item.id === Number(id))); // Convert id to number

    useEffect(() => {
        if (dishStatus === 'idle') {
            dispatch(fetchDishData());
        }
    }, [dishStatus, dispatch]);

    useEffect(() => {
        if (dishItem) {
            setName(dishItem.name || '');
            setPrice(dishItem.price || '');
            setQuantity(dishItem.quantity || '');
            setStatus(dishItem.status || true);
            setImagePath(dishItem.image || ''); // Set image path from dishItem
        }
    }, [dishItem]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('status', status);

            if (formFile) {
                formData.append('formFile', formFile);
            }

            formData.append('imagePath', imagePath); // Include current image path

            await dispatch(updateDishItem({
                id: Number(id),
                name,
                price,
                quantity,
                status,
                formFile
            })).unwrap();

            console.log('Dish item updated successfully');
            navigate('/dish-admin'); // Navigate back to Dish page after successful update
        } catch (error) {
            console.error('Error updating dish item:', error);
        }
    };

    const handleImageChange = (e) => {
        setFormFile(e.target.files[0]); // Store the selected file for upload
    };

    if (dishStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (dishStatus === 'failed') {
        return <p>Error: {dishError}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit Dish</h2>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={status ? 'Active' : 'Inactive'}
                        onChange={(e) => setStatus(e.target.value === 'Active')}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Current Image</label>
                    {imagePath ? (
                        <div className="mb-2">
                            <img
                                src={imagePath}
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

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchComboData, updateComboItem } from '../../redux/Restaurant/comboSlice';

export default function EditAdminCombo() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState(true); // Assuming status is a boolean
    const [formFile, setFormFile] = useState(null); // For handling file upload
    const [comboImage, setComboImage] = useState(''); // Initialize as a string

    // Rename the status from Redux state to avoid conflict
    const comboStatus = useSelector((state) => state.combo.status);
    const comboError = useSelector((state) => state.combo.error);
    const comboItem = useSelector((state) => state.combo.items.find(item => item.id === Number(id))); // Convert id to number

    useEffect(() => {
        if (comboStatus === 'idle') {
            dispatch(fetchComboData());
        }
    }, [comboStatus, dispatch]);

    useEffect(() => {
        if (comboItem) {
            setName(comboItem.name || '');
            setPrice(comboItem.price || '');
            setType(comboItem.type || '');
            setStatus(comboItem.status || true);
            setComboImage(comboItem.imagePath || ''); // Use imagePath from API response
        }
    }, [comboItem]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('type', type);
            formData.append('status', status);

            if (formFile) {
                formData.append('formFile', formFile);
            }

            formData.append('comboImage', comboImage); // Include current combo image path

            await dispatch(updateComboItem({
                id: Number(id),
                name,
                price,
                type,
                status,
                imagePath: comboImage,
                formFile
            })).unwrap();

            console.log('Combo item updated successfully');
            navigate('/combo-admin'); // Navigate back to Combo page after successful update
        } catch (error) {
            console.error('Error updating combo item:', error);
        }
    };

    const handleImageChange = (e) => {
        setFormFile(e.target.files[0]); // Store the selected file for upload
    };

    if (comboStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (comboStatus === 'failed') {
        return <p>Error: {comboError}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit Combo</h2>
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
                    <label>Type</label>
                    <input
                        type="text"
                        className="form-control"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={status ? 'true' : 'false'}
                        onChange={(e) => setStatus(e.target.value === 'true')}
                    >
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Current Combo Image</label>
                    {comboImage ? (
                        <div className="mb-2">
                            <img
                                src={comboImage}
                                alt="Current"
                                style={{ width: "100px", height: "100px", objectFit: "cover" }}
                            />
                        </div>
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Upload New Combo Image</label>
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
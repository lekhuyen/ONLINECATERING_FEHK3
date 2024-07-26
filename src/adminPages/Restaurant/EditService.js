import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServiceData, updateServiceItem } from '../../redux/Restaurant/ServiceSlice';

export default function EditService() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formFile, setFormFile] = useState(null); // For handling file upload
    const [imagePath, setImagePath] = useState(''); // Initialize as a string

    const serviceItem = useSelector((state) => state.service.items.find(item => item.id === Number(id))); // Convert id to number
    const status = useSelector((state) => state.service.status);
    const error = useSelector((state) => state.service.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchServiceData());
        }
    }, [status, dispatch]);

    useEffect(() => {
        if (serviceItem) {
            setName(serviceItem.name || '');
            setDescription(serviceItem.description || '');
            setImagePath(serviceItem.imagePath || ''); // Set single image path
        }
    }, [serviceItem]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('description', description);
            if (formFile) {
                formData.append('formFile', formFile);
            }

            formData.append('imagePath', imagePath); // Include current image path

            await dispatch(updateServiceItem({
                id: Number(id),
                name,
                description,
                formFile,
                imagePath
            })).unwrap();

            console.log('Service item updated successfully');
            navigate('/service'); // Navigate back to Service page after successful update
        } catch (error) {
            console.error('Error updating service item:', error);
        }
    };

    const handleImageChange = (e) => {
        setFormFile(e.target.files[0]); // Store the selected file for upload
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit Service</h2>
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
                    <label>Description</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
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

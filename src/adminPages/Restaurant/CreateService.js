import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createServiceItem } from '../../redux/Restaurant/ServiceSlice';
import { FiSend } from 'react-icons/fi';

const apiEndpoint = "http://localhost:5265/api/Service";

export default function CreateService() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [formFile, setImageFiles] = useState(null); // State to hold image file(s)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
    
        // Append image files if available
        if (formFile) {
            for (let i = 0; i < formFile.length; i++) {
                formData.append('formFile', formFile[i]); // Ensure 'formFile' matches backend expectation
            }
        }
    
        try {
            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            // Dispatch the created item to the store
            dispatch(createServiceItem({
                name,
                description,
                formFile
            }));
            
            // Clear form fields and imageFiles state
            setName('');
            setDescription('');
            setImageFiles(null);
    
            // Navigate to service list or any other desired location
            navigate('/service'); // Example: navigate to service list page
        } catch (error) {
            console.error('Error creating service:', error);
            // Handle error state or display error message to the user
        }
    };
    

    // Function to handle file input change
    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    return (
        <div className="container">
            <h2>Create Service</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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
                    <label htmlFor="formFile">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="formFile"
                        onChange={handleFileChange}
                        multiple // Allow multiple file selection
                    />
                </div>

                <button type="submit" className="btn btn-primary"><FiSend /> Create Service</button>
            </form>
        </div>
    );
}

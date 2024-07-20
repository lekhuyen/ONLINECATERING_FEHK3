import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createAboutUsItem } from '../../redux/Information/aboutSlice';

const apiEndpoint = "http://localhost:5034/api/About";

export default function CreateAboutUs() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFiles, setImageFiles] = useState(null); // State to hold multiple image files
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append('title', title);
        formData.append('content', content);
        
        // Append multiple image files
        if (imageFiles) {
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('imageFiles', imageFiles[i]);
            }
        }

        try {
            await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Refresh about data after creating a new entry
            dispatch(createAboutUsItem());
            
            // Clear form fields and imageFiles state
            setTitle('');
            setContent('');
            setImageFiles(null);

            // Navigate back to AboutUs component
            navigate('/aboutus');
        } catch (error) {
            console.error('Error creating about entry:', error);
            // Handle error state or display error message to the user
        }
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    return (
        <div className="container">
            <h2>Create About Us</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        className="form-control"
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imageFiles"
                        onChange={handleFileChange}
                        multiple // Allow multiple file selection
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
}

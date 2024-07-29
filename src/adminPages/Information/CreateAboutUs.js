import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createAboutUsItem } from '../../redux/Information/aboutSlice';
import { FiSend } from 'react-icons/fi';

const apiEndpoint = "http://localhost:5034/api/About";

export default function CreateAboutUs() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFiles, setImageFiles] = useState(null); // State to hold multiple image files
    const [aboutTypeId, setAboutTypeId] = useState('');
    const [aboutTypes, setAboutTypes] = useState([]);

    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    // Fetch about types from API
    useEffect(() => {
        const fetchAboutTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5034/api/About/abouttypes');
                setAboutTypes(response.data.data); // Assuming response.data.data contains about types array
            } catch (error) {
                console.error('Error fetching about types:', error);
            }
        };

        fetchAboutTypes();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        formData.append('title', title);
        formData.append('content', content);
        formData.append('aboutTypeId', aboutTypeId); // Append aboutTypeId to formData
        

        // Append each image file to formData
        Array.from(imageFiles).forEach(file => {
            formData.append('imageFiles', file);
        });
    

        try {
            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Dispatch the created item to the store
            dispatch(createAboutUsItem({
                title,
                content,
                aboutTypeId,
                imageFiles
            }));
            
            // Clear form fields and imageFiles state
            setTitle('');
            setContent('');
            setImageFiles(null);
            setAboutTypeId('');

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
                    <label htmlFor="aboutTypeId">About Type</label>
                    <select
                        className="form-control"
                        id="aboutTypeId"
                        value={aboutTypeId}
                        onChange={(e) => setAboutTypeId(e.target.value)}
                        required
                    >
                        <option value="">Select About Type</option>
                        {aboutTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.aboutTypeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="imageFiles">Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="imageFiles"
                        onChange={handleFileChange}
                        multiple // Allow multiple file selection
                    />
                </div>
                <button type="submit" className="btn btn-primary"><FiSend /></button>
            </form>
        </div>
    );
}

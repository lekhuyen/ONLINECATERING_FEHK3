import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiSend } from 'react-icons/fi';
import { RiArrowGoBackLine } from 'react-icons/ri';

const apiEndpoint = "http://localhost:5034/api/News";

export default function CreateNews() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newsTypeId, setNewsTypeId] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [newsTypes, setNewsTypes] = useState([]);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch news types from API
    useEffect(() => {
        const fetchNewsTypes = async () => {
            try {
                const response = await axios.get('http://localhost:5034/api/News/newtypes');
                setNewsTypes(response.data.data); // Assuming response.data.data contains news types array
            } catch (error) {
                console.error('Error fetching news types:', error);
            }
        };

        fetchNewsTypes();
    }, []);



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('newsTypeId', newsTypeId);
    
        // Append each image file to formData
        Array.from(imageFiles).forEach(file => {
            formData.append('imageFiles', file);
        });
    
        try {
            // Send formData to backend using Axios
            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
    
            console.log('Response from server:', response.data); // Log server response for debugging
    
            // Clear form fields and navigate after successful submission
            setTitle('');
            setContent('');
            setImageFiles(null);
            setNewsTypeId('');
            navigate('/newsadmin');
        } catch (error) {
            console.error('Error creating news entry:', error);
        }
    };

    // Function to handle file input change
    const handleFileChange = (e) => {
        setImageFiles(e.target.files);
    };

    const handleGoBack = () => {
        navigate("/newsadmin");
    };

    return (
        <div className="container">
            <h2>Create News</h2>
            <div className="mt-3">
                <button className="btn btn-secondary" onClick={handleGoBack}><RiArrowGoBackLine /> Go Back</button>
            </div>
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
                    <label htmlFor="newsTypeId">News Type</label>
                    <select
                        className="form-control"
                        id="newsTypeId"
                        value={newsTypeId}
                        onChange={(e) => setNewsTypeId(e.target.value)}
                        required
                    >
                        <option value="">Select News Type</option>
                        {newsTypes.map((type) => (
                            <option key={type.id} value={type.id}>
                                {type.newsTypeName}
                            </option>
                        ))}
                    </select>
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
                <button type="submit" className="btn btn-primary">
                    <FiSend />
                </button>
            </form>
        </div>
    );
}

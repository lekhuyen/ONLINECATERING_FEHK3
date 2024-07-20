import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateAboutItem } from '../../redux/Information/aboutSlice';

export default function EditAboutUs() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [title, setTitle] = useState(''); // Initialize with empty string
    const [content, setContent] = useState(''); // Initialize with empty string
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePaths, setImagePaths] = useState([]); // State to store current image paths

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const response = await axios.get(`http://localhost:5034/api/About/${id}`);
                const { title, content, imagePaths } = response.data;

                // Log the fetched data to verify
                console.log('Fetched Data:', response.data);

                setTitle(title || ''); // Ensure title is always a string
                setContent(content || ''); // Ensure content is always a string
                setImagePaths(imagePaths || []); // Ensure imagePaths is always an array

                // Log the state after setting it
                console.log('State after setting:', { title, content, imagePaths });
            } catch (error) {
                console.error('Error fetching about data for editing:', error);
            }
        };

        fetchAboutData();
    }, [id]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('content', content);

            // Append each new image file to formData
            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('imageFiles', imageFiles[i]);
            }

            // If no new images selected, retain the current image paths
            if (imageFiles.length === 0) {
                formData.append('imagePaths', JSON.stringify(imagePaths));
            }

            await dispatch(updateAboutItem(formData)).unwrap();

            console.log('About data updated successfully');
            navigate('/aboutus'); // Navigate back to AboutUs after successful update
        } catch (error) {
            console.error('Error updating about data:', error);
        }
    };

    const handleImageChange = (e) => {
        setImageFiles(e.target.files); // Store the selected image files
    };

    return (
        <div className='container'>
            <h2>Edit About Data</h2>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea className="form-control" rows="3" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className="form-group">
                    <label>Current Images</label>
                    {imagePaths.length > 0 ? (
                        imagePaths.map((imagePath, index) => (
                            <div key={index} className="mb-2">
                                <img src={`http://localhost:5034${imagePath}`} alt={`Image ${index}`} style={{ width: "100px", height: "100px", marginRight: "10px" }} />
                                <span>{imagePath}</span>
                            </div>
                        ))
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Upload New Images</label>
                    <input type="file" className="form-control-file" onChange={handleImageChange} multiple />
                </div>
                <button type="button" className="btn btn-primary" onClick={handleUpdate}>Save Changes</button>
            </form>
        </div>
    );
}

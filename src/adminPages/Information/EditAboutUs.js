import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutData, updateAboutItem } from '../../redux/Information/aboutSlice';

export default function EditAboutUs() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageFiles, setImageFiles] = useState([]); // Handle multiple files
    const [imagePaths, setImagePaths] = useState([]);
    
    const aboutItem = useSelector((state) => state.about.items.find(item => item.id === id));
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAboutData(id));
        }
    }, [id, status, dispatch]);

    useEffect(() => {
        if (aboutItem) {
            setTitle(aboutItem.title || '');
            setContent(aboutItem.content || '');
            setImagePaths(aboutItem.imagePaths || []);
        }
    }, [aboutItem]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('content', content);

            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('imageFiles', imageFiles[i]);
            }

            formData.append('imagePaths', JSON.stringify(imagePaths));

            await dispatch(updateAboutItem({
                id,
                title,
                content,
                imageFiles: imageFiles.length > 0 ? imageFiles : undefined,
                imagePaths: imagePaths
            })).unwrap();

            console.log('About data updated successfully');
            navigate('/aboutus'); // Navigate back to AboutUs after successful update
        } catch (error) {
            console.error('Error updating about data:', error);
        }
    };

    const handleImageChange = (e) => {
        setImageFiles(e.target.files); // Store the selected image files
    };

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit About Data</h2>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        className="form-control"
                        rows="3"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Current Images</label>
                    {imagePaths.length > 0 ? (
                        <div className="d-flex flex-wrap">
                            {imagePaths.map((imagePath, index) => (
                                <div key={index} className="mb-2 mr-2">
                                    <img
                                        src={`http://localhost:5034${imagePath}`}
                                        alt={`Image ${index}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No images available</p>
                    )}
                </div>
                <div className="form-group">
                    <label>Upload New Images</label>
                    <input
                        type="file"
                        className="form-control-file"
                        onChange={handleImageChange}
                        multiple
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

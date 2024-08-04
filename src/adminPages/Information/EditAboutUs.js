import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAboutData, updateAboutItem } from '../../redux/Information/aboutSlice';
import { fetchAboutTypes } from '../../redux/Information/aboutTypeSlice';

export default function EditAboutUs() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [aboutTypeId, setAboutTypeId] = useState('');
    const [imageFiles, setImageFiles] = useState([]); // Handle multiple files
    const [imagePaths, setImagePaths] = useState([]);

    const aboutItem = useSelector((state) => state.about.items.find(item => item.id === id));
    const aboutTypes = useSelector((state) => state.aboutTypes.items);
    const status = useSelector((state) => state.about.status);
    const aboutTypeStatus = useSelector((state) => state.aboutTypes.status);
    const error = useSelector((state) => state.about.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchAboutData(id));
        }
        if (aboutTypeStatus === 'idle') {
            dispatch(fetchAboutTypes());
        }
    }, [id, status, aboutTypeStatus, dispatch]);

    useEffect(() => {
        if (aboutItem) {
            setTitle(aboutItem.title || '');
            setContent(aboutItem.content || '');
            setImagePaths(aboutItem.imagePaths || []);
            const selectedType = aboutTypes.find(type => type.aboutTypeName === aboutItem.aboutTypeName);
            setAboutTypeId(selectedType ? selectedType.id : '');
        }
    }, [aboutItem, aboutTypes]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('aboutTypeId', aboutTypeId);

            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('imageFiles', imageFiles[i]);
            }

            formData.append('imagePaths', JSON.stringify(imagePaths));

            await dispatch(updateAboutItem({
                id,
                title,
                content,
                aboutTypeId,
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
        setImageFiles(Array.from(e.target.files)); // Store the selected image files
    };

    if (status === 'loading' || aboutTypeStatus === 'loading') {
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
                    <label>Current Images</label>
                    <div className="d-flex flex-wrap">
                        {imagePaths.length > 0 ? (
                            imagePaths.map((imagePath, index) => (
                                <img
                                    key={index}
                                    src={imagePath}
                                    alt={`about ${id}`}
                                    style={{
                                        width: "100px",
                                        height: "auto",
                                        objectFit: "cover",
                                        marginBottom: "5px",
                                        marginRight: "5px"
                                    }}
                                />
                            ))
                        ) : (
                            <p>No images available</p>
                        )}
                    </div>
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

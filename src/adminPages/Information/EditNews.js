// EditNews Component
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsData, updateNewsItem } from '../../redux/Information/newsSlice';
import { fetchNewsTypes } from '../../redux/Information/newsTypeSlice';

export default function EditNews() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [newsTypeId, setNewsTypeId] = useState('');
    const [imageFiles, setImageFiles] = useState([]);
    const [imagePaths, setImagePaths] = useState([]);

    const newsItem = useSelector((state) => state.news.items.find(item => item.id === id));
    const newsTypes = useSelector((state) => state.newsTypes.items);
    const status = useSelector((state) => state.news.status);
    const newsTypeStatus = useSelector((state) => state.newsTypes.status);
    const error = useSelector((state) => state.news.error);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchNewsData(id));
        }
        if (newsTypeStatus === 'idle') {
            dispatch(fetchNewsTypes());
        }
    }, [id, status, newsTypeStatus, dispatch]);

    useEffect(() => {
        if (newsItem) {
            setTitle(newsItem.title || '');
            setContent(newsItem.content || '');
            setImagePaths(newsItem.imagePaths || []);
            const selectedType = newsTypes.find(type => type.aboutTypeName === newsItem.aboutTypeName);
            setNewsTypeId(selectedType ? selectedType.id : '');
        }
    }, [newsItem, newsTypes]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('content', content);
            formData.append('newsTypeId', newsTypeId);

            for (let i = 0; i < imageFiles.length; i++) {
                formData.append('imageFiles', imageFiles[i]);
            }

            formData.append('imagePaths', JSON.stringify(imagePaths));

            await dispatch(updateNewsItem({
                id,
                title,
                content,
                newsTypeId,
                imageFiles: imageFiles.length > 0 ? imageFiles : undefined,
                imagePaths: imagePaths
            })).unwrap();

            console.log('News data updated successfully');
            navigate('/newsadmin');
        } catch (error) {
            console.error('Error updating news item:', error);
        }
    };

    const handleImageChange = (e) => {
        setImageFiles(e.target.files);
    };

    if (status === 'loading' || newsTypeStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (status === 'failed') {
        return <p>Error: {error}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit News Data</h2>
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
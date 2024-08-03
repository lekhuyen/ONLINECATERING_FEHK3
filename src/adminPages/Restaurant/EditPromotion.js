import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromotionData, updatePromotionItem } from '../../redux/Restaurant/promotionSlice';

export default function EditPromotion() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantityTable, setQuantityTable] = useState('');
    const [status, setStatus] = useState(true); // Assuming status is a boolean
    const [formFile, setFormFile] = useState(null); // For handling file upload
    const [imagePath, setImagePath] = useState(''); // Initialize as a string

    // Rename the status from Redux state to avoid conflict
    const promotionStatus = useSelector((state) => state.promotion.status);
    const promotionError = useSelector((state) => state.promotion.error);
    const promotionItem = useSelector((state) => state.promotion.promotions.find(item => item.id === Number(id))); // Convert id to number

    useEffect(() => {
        if (promotionStatus === 'idle') {
            dispatch(fetchPromotionData());
        }
    }, [promotionStatus, dispatch]);

    useEffect(() => {
        if (promotionItem) {
            setName(promotionItem.name || '');
            setDescription(promotionItem.description || '');
            setPrice(promotionItem.price || '');
            setQuantityTable(promotionItem.quantityTable || '');
            setStatus(promotionItem.status || true);
            setImagePath(promotionItem.imagePath || ''); // Set single image path
        }
    }, [promotionItem]);

    const handleUpdate = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('description', description);
            formData.append('price', price);
            formData.append('quantityTable', quantityTable);
            formData.append('status', status);

            if (formFile) {
                formData.append('formFile', formFile);
            }

            formData.append('imagePath', imagePath); // Include current image path

            await dispatch(updatePromotionItem({
                id: Number(id),
                name,
                description,
                price,
                quantityTable,
                status,
                formFile
            })).unwrap();

            console.log('Promotion updated successfully');
            navigate('/promotion'); // Navigate back to promotions page after successful update
        } catch (error) {
            console.error('Error updating promotion:', error);
        }
    };

    const handleImageChange = (e) => {
        setFormFile(e.target.files[0]); // Store the selected file for upload
    };

    if (promotionStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (promotionStatus === 'failed') {
        return <p>Error: {promotionError}</p>;
    }

    return (
        <div className='container'>
            <h2>Edit Promotion</h2>
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
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
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
                    <label>Quantity Table</label>
                    <input
                        type="number"
                        className="form-control"
                        value={quantityTable}
                        onChange={(e) => setQuantityTable(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label>Status</label>
                    <select
                        className="form-control"
                        value={status ? 'Active' : 'Inactive'}
                        onChange={(e) => setStatus(e.target.value === 'Active')}
                    >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                    </select>
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

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAppetizerData, updateAdminAppetizerItem } from '../../redux/Restaurant/adminappetizersSlice';
import { RiArrowGoBackLine } from 'react-icons/ri';

export default function EditAdminAppetizer() {
    const { id } = useParams(); // Get id from URL params
    const navigate = useNavigate(); // Initialize useNavigate hook
    const dispatch = useDispatch(); // Initialize useDispatch hook

    // State for form fields and file upload
    const [appetizerName, setAppetizerName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [formFile, setFormFile] = useState(null); // For handling file upload
    const [appetizerImage, setAppetizerImage] = useState(''); // Current image path
    const [errors, setErrors] = useState({ // State for validation
        name: false,
        price: false,
        quantity: false,
    });

    // Redux state
    const appetizerStatus = useSelector((state) => state.adminappetizer.status);
    const appetizerError = useSelector((state) => state.adminappetizer.error);
    const appetizerItem = useSelector((state) => state.adminappetizer.items.find(item => item.id === Number(id)));

    useEffect(() => {
        if (appetizerStatus === 'idle') {
            dispatch(fetchAppetizerData());
        }
    }, [appetizerStatus, dispatch]);

    useEffect(() => {
        if (appetizerItem) {
            setAppetizerName(appetizerItem.appetizerName || '');
            setPrice(appetizerItem.price || '');
            setQuantity(appetizerItem.quantity || '');
            setAppetizerImage(appetizerItem.appetizerImage || ''); // Set current image path
        }
    }, [appetizerItem]);

    const handleUpdate = async () => {
        // Reset errors
        setErrors({
            name: false,
            price: false,
            quantity: false,
        });

        // Validation: Check if fields are valid
        let hasError = false;

        if (!appetizerName) {
            setErrors((prev) => ({ ...prev, name: true }));
            hasError = true;
        }

        if (!price || price < 0) {
            setErrors((prev) => ({ ...prev, price: true }));
            hasError = true;
        }

        if (!quantity || quantity < 0) {
            setErrors((prev) => ({ ...prev, quantity: true }));
            hasError = true;
        }

        if (hasError) {
            return; 
        }

        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('appetizerName', appetizerName);
            formData.append('price', price);
            formData.append('quantity', quantity);

            if (formFile) {
                formData.append('formFile', formFile);
            }

            formData.append('appetizerImage', appetizerImage); // Include current image path

            await dispatch(updateAdminAppetizerItem({
                id: Number(id),
                AppetizerName: appetizerName,
                Price: price,
                Quantity: quantity,
                imagePath: appetizerImage,
                formFile
            })).unwrap();

            console.log('Appetizer item updated successfully');
            navigate('/appetizer-admin'); // Navigate back to Appetizer page after successful update
        } catch (error) {
            console.error('Error updating appetizer item:', error);
        }
    };

    const handleImageChange = (e) => {
        setFormFile(e.target.files[0]); // Store the selected file for upload
    };

    if (appetizerStatus === 'loading') {
        return <p>Loading...</p>;
    }

    if (appetizerStatus === 'failed') {
        return <p>Error: {appetizerError}</p>;
    }

    const handleGoBack = () => {
        navigate('/appetizer-admin'); // Navigate back to dessert list page
    };

    return (
        <div className='container'>
            <h2>Edit Appetizer</h2>
            <button className="btn btn-secondary" onClick={handleGoBack}>
                <RiArrowGoBackLine /> Go Back
            </button>
            <form>
                <div className="form-group">
                    <label>Appetizer Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                        value={appetizerName}
                        onChange={(e) => setAppetizerName(e.target.value)}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">Appetizer name is required.</div>}
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        type="number"
                        className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        required
                    />
                    {errors.price && <div className="invalid-feedback">Price must be a positive number.</div>}
                </div>
                <div className="form-group">
                    <label>Quantity</label>
                    <input
                        type="number"
                        className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                    />
                    {errors.quantity && <div className="invalid-feedback">Quantity must be a positive number.</div>}
                </div>

                <div className="form-group">
                    <label>Current Image</label>
                    {appetizerImage ? (
                        <div className="mb-2">
                            <img
                                src={appetizerImage}
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

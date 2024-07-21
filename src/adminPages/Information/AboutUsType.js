import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAboutTypes, createAboutType } from '../../redux/Information/aboutTypeSlice';
import { FiSend } from 'react-icons/fi';

function AboutUs() {
    const dispatch = useDispatch();
    const aboutTypeData = useSelector((state) => state.aboutTypes?.items || []);
    const status = useSelector((state) => state.aboutTypes.status);
    const error = useSelector((state) => state.aboutTypes.error);
    const [newAboutTypeName, setNewAboutTypeName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchAboutTypes());
    }, [dispatch]);

    const handleAddAboutType = () => {
        if (newAboutTypeName.trim() === '') {
            alert('Type name cannot be empty');
            return;
        }

        setIsSubmitting(true);
        dispatch(createAboutType({ aboutTypeName: newAboutTypeName }))
            .unwrap()
            .then(() => {
                setNewAboutTypeName('');
                setIsSubmitting(false);
                const modalElement = document.getElementById('TypeModal');
                if (modalElement) {
                    const modal = new window.bootstrap.Modal(modalElement);
                    modal.hide();
                }
            })
            .catch((error) => {
                setIsSubmitting(false);
                console.error('Failed to add about type:', error);
            });
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    // Debugging: Log the aboutTypeData to ensure keys are unique
    console.log('aboutTypeData:', aboutTypeData);

    return (
        <div className='container'>
            <h2>About Us Content</h2>
            <button type="button" className="btn btn-info btn-lg" data-bs-toggle="modal" data-bs-target="#TypeModal">
                Create About Type
            </button>

            {/* Modal content */}
            <div className="modal fade" id="TypeModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title">Type of About Us</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>About Type Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {aboutTypeData.map((type) => (
                                        <tr key={type.id}>
                                            <td>{type.aboutTypeName}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="form-group">
                                <label htmlFor="newAboutTypeName">New About Type Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="newAboutTypeName"
                                    value={newAboutTypeName}
                                    onChange={(e) => setNewAboutTypeName(e.target.value)}
                                    required
                                />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddAboutType}
                                disabled={isSubmitting}
                            >
                                <FiSend /> {isSubmitting ? 'Adding...' : 'Add Type'}
                            </button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUs;

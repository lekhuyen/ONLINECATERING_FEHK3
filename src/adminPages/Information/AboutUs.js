import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

import axios from 'axios';
import { deleteAboutItem, fetchAboutData } from '../../redux/Information/aboutSlice';

function AboutUs() {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation

    const aboutData = useSelector((state) => state.about.items);
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    useEffect(() => {
        dispatch(fetchAboutData());
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5034/api/About/${id}`);
            dispatch(deleteAboutItem(id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/AboutUs-edit/${id}`); // Navigate to EditAboutUs page with the id
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h2>About Us Content</h2>
            <button className="btn btn-success mb-3" onClick={() => navigate('/Create-About-Us')}>Create About Us</button>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {aboutData.map((about) => (
                        <tr key={about.id}>
                            <td>{about.id}</td>
                            <td>{about.title}</td>
                            <td>{about.content}</td>
                            <td>
                                {about.imagePaths && about.imagePaths.map((image, index) => (
                                    <img
                                        key={index}
                                        src={`http://localhost:5034${image}`}
                                        alt={`About ${index}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                    />
                                ))}
                            </td>
                            <td>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => handleEdit(about.id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="btn btn-danger ml-2"
                                    onClick={() => handleDelete(about.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AboutUs;

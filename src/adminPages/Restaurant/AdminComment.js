import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';

import {
    deleteAdminComment,
    fetchCommentData,
    toggleCommentStatus
} from '../../redux/Restaurant/admincommentSlice';

import {
    fetchDishData
} from '../../redux/Restaurant/dishSlice';

import {
    fetchAppetizerData
} from '../../redux/Restaurant/adminappetizersSlice';
import { fetchDessertData } from '../../redux/Restaurant/admindessertSlice';



export default function AdminComment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const commentData = useSelector((state) => state.admincomment?.items || []);
    const status = useSelector((state) => state.admincomment?.status || 'idle');
    const error = useSelector((state) => state.admincomment?.error || null);
    const dishData = useSelector((state) => state.dish?.items || []);
    const appetizerData = useSelector((state) => state.adminappetizer?.items || []);
    const dessertData = useSelector((state) => state.admindessert?.items || []); // Retrieve dessert data from Redux store

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchCommentData());
        dispatch(fetchDishData());
        dispatch(fetchAppetizerData());
        dispatch(fetchDessertData()); // Fetch dessert data when the component mounts
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAdminComment(id));
    };

    const handleToggleStatus = (id, currentStatus) => {
        const newStatus = !currentStatus; // Toggle the current status
        dispatch(toggleCommentStatus({ id, status: newStatus }));
    };

    // Create a dictionary of dessert names mapped by their IDs
    const dessertNameById = dessertData.reduce((acc, dessert) => {
        acc[dessert.id] = dessert.dessertName; // Adjust according to your dessert item structure
        return acc;
    }, {});

    // Create a dictionary of appetizer names mapped by their IDs (similar to how appetizer names are handled)
    const appetizerNameById = appetizerData.reduce((acc, appetizer) => {
        acc[appetizer.id] = appetizer.appetizerName;
        return acc;
    }, {});

    // Create a dictionary of dish names mapped by their IDs (similar to how dish names are handled)
    const dishNameById = dishData.reduce((acc, dish) => {
        acc[dish.id] = dish.name;
        return acc;
    }, {});

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCommentData = commentData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(commentData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Admin Comments</h2>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Restaurant</th>
                            <th>Dish</th>
                            <th>Appetizer</th>
                            <th>Dessert</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCommentData.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.id}</td>
                                <td>{comment.user?.username}</td>
                                <td>{comment.restaurantId}</td>
                                <td>{dishNameById[comment.dishId]}</td>
                                <td>{appetizerNameById[comment.appetizerId]}</td>
                                <td>{dessertNameById[comment.dessertId]}</td> {/* Display dessert name using dessertNameById */}
                                <td>{comment.content}</td>
                                <td>
                                    <span className={`badge ${comment.status ? 'bg-danger' : 'bg-success'}`}>
                                        {comment.status ? 'Blocked' : 'Appear'}
                                    </span> 
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(comment.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleToggleStatus(comment.id, comment.status)}
                                    >
                                        {comment.status ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <nav>
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                    </li>
                    {Array.from({ length: pageNumbers }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => paginate(currentPage + 1)}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

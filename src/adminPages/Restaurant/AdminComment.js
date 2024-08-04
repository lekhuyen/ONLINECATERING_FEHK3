// AdminComment.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';


import {
    deleteAdminComment,
    fetchCommentData
} from '../../redux/Restaurant/admincommentSlice';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

export default function AdminComment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const commentData = useSelector((state) => state.admincomment?.items || []);
    const status = useSelector((state) => state.admincomment?.status || 'idle');
    const error = useSelector((state) => state.admincomment?.error || null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        dispatch(fetchCommentData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAdminComment(id));
    };

    const handleEdit = (id) => {
        // Implement edit functionality if needed
    };

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
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCommentData.map((comment) => (
                            <tr key={comment.id}>
                                <td>{comment.id}</td>
                                <td>{comment.user.username}</td> {/* Assuming user has username */}
                                <td>{comment.restaurantId}</td>
                                <td>{comment.dishId}</td>
                                <td>{comment.appetizerId}</td>
                                <td>{comment.dessertId}</td>
                                <td>{comment.content}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(comment.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(comment.id)}
                                    >
                                        <FaRegTrashAlt />
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

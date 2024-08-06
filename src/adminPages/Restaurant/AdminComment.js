import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import styles from './AdminComment.module.scss';

import {
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
import { fetchUserData } from '../../redux/Restaurant/adminuserSlice';

export default function AdminComment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const commentData = useSelector((state) => state.admincomment.items || []);
    const status = useSelector((state) => state.admincomment.status || 'idle');
    const error = useSelector((state) => state.admincomment.error || null);
    const dishData = useSelector((state) => state.dish.items || []);
    const appetizerData = useSelector((state) => state.adminappetizer.items || []);
    const dessertData = useSelector((state) => state.admindessert.items || []);
    const userData = useSelector((state) => state.adminuser.users || []);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedComment, setSelectedComment] = useState(null);
    const [confirmToggle, setConfirmToggle] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        dispatch(fetchCommentData());
        dispatch(fetchDishData());
        dispatch(fetchAppetizerData());
        dispatch(fetchDessertData());
        dispatch(fetchUserData());
    }, [dispatch]);

    const handleInfoClick = (comment) => {
        setSelectedComment(comment);
        setShowDetailModal(true);
    };

    const handleToggleStatus = (id, currentStatus) => {
        if (confirmToggle) {
            const newStatus = !currentStatus;
            dispatch(toggleCommentStatus({ id, status: newStatus }))
                .then(() => setConfirmToggle(false))
                .catch((error) => {
                    console.error('Error toggling comment status:', error);
                    alert(error.response?.data?.message || 'Failed to toggle comment status. Please try again.');
                });
        } else {
            setConfirmToggle(true);
        }
    };

    const truncateContent = (content) => {
        const words = content.split(' ');
        if (words.length > 6) {
            return words.slice(0, 6).join(' ') + '...';
        }
        return content;
    };

    const detectBadWords = (content) => {
        const badWords = ['bad', 'inappropriate', 'offensive', 'hate'];
        const lowerCaseContent = content.toLowerCase();
        return badWords.some(word => lowerCaseContent.includes(word));
    };

    const dessertNameById = dessertData.reduce((acc, dessert) => {
        acc[dessert.id] = dessert.dessertName;
        return acc;
    }, {});

    const appetizerNameById = appetizerData.reduce((acc, appetizer) => {
        acc[appetizer.id] = appetizer.appetizerName;
        return acc;
    }, {});

    const dishNameById = dishData.reduce((acc, dish) => {
        acc[dish.id] = dish.name;
        return acc;
    }, {});

    const usernameById = userData.reduce((acc, user) => {
        acc[user.id] = user.userName;
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

    const totalCommentsFromUsers = commentData.length;
    const badCommentsFromUsers = commentData.filter(comment => detectBadWords(comment.content)).length;

    return (
        <div className={`container mt-5 ${styles.container}`}>
            <h2>Comment Management</h2>

            <div className="container mt-5">
                <table className={`table table-hover ${styles.table}`}>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>User Name</th>
                            <th>Dish</th>
                            <th>Appetizer</th>
                            <th>Dessert</th>
                            <th>Content</th>
                            <th>Status</th>
                            <th>Detail</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentCommentData.map((comment) => (
                            <tr key={comment.id} className={detectBadWords(comment.content) ? 'bg-danger' : ''}>
                                <td>{comment.id}</td>
                                <td>{usernameById[comment.userId]}</td>
                                <td>{dishNameById[comment.dishId]}</td>
                                <td>{appetizerNameById[comment.appetizerId]}</td>
                                <td>{dessertNameById[comment.dessertId]}</td>
                                <td>{truncateContent(comment.content)}</td>
                                <td>
                                    <span className={`badge ${comment.status ? 'bg-danger' : 'bg-success'}`}>
                                        {comment.status ? 'Blocked' : 'Display'}
                                    </span>
                                </td>
                                <td>
                                    <button
                                        className={`btn btn-outline-primary ${styles.btnOutlinePrimary}`}
                                        onClick={() => handleInfoClick(comment)}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={`btn btn-outline-primary ${styles.btnOutlinePrimary}`}
                                        onClick={() => handleToggleStatus(comment.id, comment.status)}
                                    >
                                        {confirmToggle ? 'Are you sure?' : comment.status ? 'Unblock' : 'Block'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Comment Details */}
            {showDetailModal && (
                <div className={styles.modalOverlay} tabIndex="-1" role="dialog">
                    <div className={styles.modalDialog} role="document">
                        <div className={styles.modalContent}>
                            <div className={styles.modalHeader}>
                                <h5 className={styles.modalTitle}>Comment Details</h5>
                                <button
                                    type="button"
                                    className={`btn-close ${styles.btnClose}`}
                                    onClick={() => setShowDetailModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className={styles.modalBody}>
                                {selectedComment && (
                                    <div>
                                        <h5>User: {usernameById[selectedComment.userId]}</h5>
                                        <p><strong>Dish:</strong> {dishNameById[selectedComment.dishId]}</p>
                                        <p><strong>Appetizer:</strong> {appetizerNameById[selectedComment.appetizerId]}</p>
                                        <p><strong>Dessert:</strong> {dessertNameById[selectedComment.dessertId]}</p>
                                        <p><strong>Content:</strong> {selectedComment.content}</p>
                                        <p><strong>Status:</strong> {selectedComment.status ? 'Blocked' : 'Display'}</p>
                                        <p>
                                            <strong>Content Analysis:</strong>{' '}
                                            {detectBadWords(selectedComment.content) ? (
                                                <span className="text-danger">Contains bad words!</span>
                                            ) : (
                                                <span className="text-success">No bad words detected.</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <div className={styles.modalFooter}>
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className='row'>
                <div className='col-sm-6'>
                    {/* Pagination */}
                    <nav>
                        <ul className={`pagination ${styles.pagination}`}>
                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                <button className="page-link" onClick={() => paginate(currentPage - 1)}>Previous</button>
                            </li>
                            {Array.from({ length: pageNumbers }, (_, index) => (
                                <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
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

                <div className='col-sm-6 text-end'>
                    {/* Display total comments and bad comments */}
                    <div>
                        <p className="mb-0">Total comments from users: {totalCommentsFromUsers}</p>
                        <p className="mb-0">Bad comments from users: {badCommentsFromUsers}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

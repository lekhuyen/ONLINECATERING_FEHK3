import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deletePromotionItem, fetchPromotionData } from '../../redux/Restaurant/promotionSlice';

export default function Promotion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const promotionData = useSelector((state) => state.promotion.items);
    const status = useSelector((state) => state.promotion.status);
    const error = useSelector((state) => state.promotion.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedPromotion, setSelectedPromotion] = useState(null);

    useEffect(() => {
        dispatch(fetchPromotionData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deletePromotionItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/promotion/edit-promotion/${id}`);
    };

    const handleInfoClick = (promotion) => {
        setSelectedPromotion(promotion);
        // Show modal
        const modal = new window.bootstrap.Modal(document.getElementById('promotionModal'));
        modal.show();
    };

    const filteredPromotionData = promotionData.filter((promotion) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            promotion.name.toLowerCase().includes(searchTermLowerCase) ||
            promotion.description.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentPromotionData = filteredPromotionData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredPromotionData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h2>Promotion Table</h2>

            <div className="row mb-3">
                <div className="col-sm-9">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Description:
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            id="searchTerm"
                            className="form-control"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Type to search..."
                        />
                        <button className="btn btn-outline-secondary" type="button">
                            Search
                        </button>
                    </div>
                </div>

                <div className="col-sm-3">
                    <button className="btn btn-success mb-3" onClick={() => navigate('/promotion/create-promotion')}>Add Promotion</button>
                </div>
            </div>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Quantity Table</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentPromotionData.map((promotion) => (
                            <tr key={promotion.id}>
                                <td>{promotion.id}</td>
                                <td>{promotion.name}</td>
                                <td>{promotion.description}</td>
                                <td>{promotion.status ? 'Active' : 'Inactive'}</td>
                                <td>{promotion.quantityTable}</td>
                                <td>{promotion.price}</td>
                                <td>
                                    {promotion.imagePath && (
                                        <img
                                            src={promotion.imagePath}
                                            alt={`Promotion ${promotion.id}`}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleInfoClick(promotion)}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(promotion.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(promotion.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Promotion Details */}
            <div className="modal fade" id="promotionModal" tabIndex="-1" role="dialog" aria-labelledby="promotionModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="promotionModalLabel">
                                Promotion Details: {selectedPromotion ? selectedPromotion.name : ''}
                            </h4>
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedPromotion && (
                                <div>
                                    <h5>Description:</h5>
                                    <p>{selectedPromotion.description}</p>
                                    <h5>Image:</h5>
                                    {selectedPromotion.imagePath ? (
                                        <img
                                            src={selectedPromotion.imagePath}
                                            alt={`Promotion ${selectedPromotion.id}`}
                                            style={{
                                                width: "20%",
                                                height: "auto",
                                                objectFit: "cover",
                                            }}
                                        />
                                    ) : (
                                        <p>No image available</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
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

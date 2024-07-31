import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteDishItem, fetchDishData } from '../../redux/Restaurant/dishSlice';
import { fetchCustomComboData } from '../../redux/Restaurant/customComboSlice';

export default function AdminDish() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dishData = useSelector((state) => state.dish.items);
    const status = useSelector((state) => state.dish.status);
    const error = useSelector((state) => state.dish.error);
    const customComboData = useSelector((state) => state.customCombo.customCombos);
    const comboStatus = useSelector((state) => state.customCombo.status);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDish, setSelectedDish] = useState(null);
    const [selectedCombo, setSelectedCombo] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showComboModal, setShowComboModal] = useState(false);

    useEffect(() => {
        dispatch(fetchDishData());
        dispatch(fetchCustomComboData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteDishItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/dish-admin/edit-dish-admin/${id}`);
    };

    const handleInfoClick = (dish) => {
        setSelectedDish(dish);
        setShowModal(true);
    };

    const handleComboInfoClick = (dish) => {
        const filteredCombos = customComboData.filter(combo => combo.dishId === dish.id);
        setSelectedCombo(filteredCombos);
        setShowComboModal(true);
    };

    const filterBySearchTerm = (dish) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const priceMatches = dish.price.toString().includes(searchTermLowerCase);
        const statusMatches = dish.status ? 'active'.includes(searchTermLowerCase) : 'inactive'.includes(searchTermLowerCase);
        const nameMatches = dish.name?.toLowerCase().includes(searchTermLowerCase);
        const typeMatches = dish.type?.toLowerCase().includes(searchTermLowerCase);

        return nameMatches || priceMatches || statusMatches || typeMatches;
    };

    const filteredDishData = dishData.filter(filterBySearchTerm);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDishData = filteredDishData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredDishData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Dish Table</h2>

            <div className="row mb-3">
                <div>
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Price/Status:
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
            </div>

                <div>
                    <button className="btn btn-success mb-3" onClick={() => navigate('/dish-admin/create-dish-admin')}>
                        Add Dish
                    </button>
                </div>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDishData.map((dish) => (
                            <tr key={dish.id}>
                                <td>{dish.id}</td>
                                <td>{dish.name}</td>
                                <td>{dish.price}</td>
                                <td>{dish.quantity}</td>
                                <td>{dish.status ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {dish.imagePath && dish.imagePath.length > 0 && (
                                        <img
                                            src={dish.imagePath}
                                            alt={`Dish ${dish.id}`}
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
                                        onClick={() => handleInfoClick(dish)}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleComboInfoClick(dish)}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(dish.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(dish.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Dish Details */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Dish Details: {selectedDish ? selectedDish.name : ''}
                                </h4>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setShowModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedDish && (
                                    <div>
                                        <h5>Price:</h5>
                                        <p>{selectedDish.price}</p>
                                        <h5>Status:</h5>
                                        <p>{selectedDish.status ? 'Active' : 'Inactive'}</p>
                                        {selectedDish.imagePath && (
                                            <div>
                                                <h5>Image:</h5>
                                                <img
                                                    src={selectedDish.imagePath}
                                                    alt={`Dish ${selectedDish.id}`}
                                                    style={{
                                                        width: "300px",
                                                        height: "300px",
                                                        objectFit: "cover",
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Custom Combo Details */}
            {showComboModal && (
            <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowComboModal(false)}>
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Custom Combo Details for Dish ID: {selectedCombo.length > 0 ? selectedCombo[0].dishId : ''}
                                </h4>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setShowComboModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {selectedCombo.length > 0 ? (
                                    <table className="table table-dark">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>User Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Date</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedCombo.map((combo) => (
                                                <tr key={combo.userId}>
                                                    <td>{combo.userId}</td>
                                                    <td>{combo.userName}</td>
                                                    <td>{combo.userEmail}</td>
                                                    <td>{combo.phone}</td>
                                                    <td>{new Date(combo.date).toLocaleString()}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                ) : (
                                    <p>No data available.</p>
                                )}
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowComboModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}



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

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteDishItem, fetchDishData } from '../../redux/Restaurant/dishSlice';

export default function AdminDish() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dishData = useSelector((state) => state.dish.items);
    const status = useSelector((state) => state.dish.status);
    const error = useSelector((state) => state.dish.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDish, setSelectedDish] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        dispatch(fetchDishData());
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

    const filteredDishData = dishData.filter((dish) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            dish.name.toLowerCase().includes(searchTermLowerCase) ||
            dish.type.toLowerCase().includes(searchTermLowerCase)
        );
    });

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
                <div className="col-sm-9">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Type:
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
                    <button className="btn btn-success mb-3" onClick={() => navigate('/dish-admin/create-dish-admin')}>
                        Add Dish
                    </button>
                </div>
            </div>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
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
                                        <h5>Type:</h5>
                                        <p>{selectedDish.type}</p>
                                        <h5>Image:</h5>
                                        {selectedDish.imagePath ? (
                                            <img
                                                src={selectedDish.imagePath}
                                                alt={`Dish ${selectedDish.id}`}
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
                                    onClick={() => setShowModal(false)}
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

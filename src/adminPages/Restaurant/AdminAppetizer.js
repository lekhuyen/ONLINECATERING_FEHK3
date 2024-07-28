import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteAdminAppetizerItem, fetchAppetizerData } from '../../redux/Restaurant/adminappetizersSlice';

export default function AdminAppetizer() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const appetizerData = useSelector((state) => state.adminappetizer?.items || []);
    const status = useSelector((state) => state.appetizer?.status || 'idle');
    const error = useSelector((state) => state.appetizer?.error || null);
    //const customComboData = useSelector((state) => state.customCombo.customCombos);
    //const comboStatus = useSelector((state) => state.customCombo.status);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedAppetizer, setSelectedAppetizer] = useState(null);
    //const [selectedCombo, setSelectedCombo] = useState([]);
    const [showModal, setShowModal] = useState(false);
    //const [showComboModal, setShowComboModal] = useState(false);

    useEffect(() => {
        dispatch(fetchAppetizerData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAdminAppetizerItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/appetizer-admin/edit-appetizer-admin/${id}`);
    };

    const handleInfoClick = (appetizer) => {
        setSelectedAppetizer(appetizer);
        setShowModal(true);
    };

    // const handleComboInfoClick = (appetizer) => {
    //     const filteredCombos = customComboData.filter(combo => combo.appetizerId === appetizer.id); // Adjust attribute if necessary
    //     setSelectedCombo(filteredCombos);
    //     setShowComboModal(true);
    // };

    const filterBySearchTerm = (appetizer) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const priceMatches = appetizer.price.toString().includes(searchTermLowerCase);
        const nameMatches = appetizer.appetizerName?.toLowerCase().includes(searchTermLowerCase);

        return nameMatches || priceMatches;
    };

    const filteredAppetizerData = appetizerData.filter(filterBySearchTerm);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAppetizerData = filteredAppetizerData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredAppetizerData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Appetizer Table</h2>

            <div className="row mb-3">
                <div className="col-sm-9">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Price:
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
                    <button className="btn btn-success mb-3" onClick={() => navigate('/appetizer-admin/create-appetizer-admin')}>
                        Add Appetizer
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
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAppetizerData.map((appetizer) => (
                            <tr key={appetizer.id}>
                                <td>{appetizer.id}</td>
                                <td>{appetizer.appetizerName }</td>
                                <td>{appetizer.price}</td>
                                <td>
                                {appetizer.appetizerImage && (
                                        <img
                                            src={appetizer.appetizerImage}
                                            alt={`Appetizer ${appetizer.id}`}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </td>
                                <td>
                                    {/* <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleInfoClick(appetizer)}
                                    >
                                        <BsInfoCircle />
                                    </button> */}
                                    {/* <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleComboInfoClick(appetizer)}
                                    >
                                        <BsInfoCircle />
                                    </button> */}
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(appetizer.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(appetizer.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Appetizer Details */}
            {/* {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowModal(false)}>
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Appetizer Details: {selectedAppetizer ? selectedAppetizer.name : ''}
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
                                {selectedAppetizer && (
                                    <div>
                                        <h5>Price:</h5>
                                        <p>{selectedAppetizer.price}</p>
                                        <h5>Status:</h5>
                                        {selectedAppetizer.imagePath && (
                                            <div>
                                                <h5>Image:</h5>
                                                <img
                                                    src={selectedAppetizer.imagePath}
                                                    alt={`Appetizer ${selectedAppetizer.id}`}
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
            )} */}

            {/* Modal for Custom Combo Details
            {showComboModal && (
                <div className="modal fade show" style={{ display: 'block' }} onClick={() => setShowComboModal(false)}>
                    <div className="modal-dialog modal-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">
                                    Custom Combo Details for Appetizer ID: {selectedCombo.length > 0 ? selectedCombo[0].appetizerId : ''}
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
            )} */}

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

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteComboItem, fetchComboData } from '../../redux/Restaurant/comboSlice';


export default function AdminCombo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const comboData = useSelector((state) => state.combo.items);
    const status = useSelector((state) => state.combo.status);
    const error = useSelector((state) => state.combo.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Adjust as needed
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCombo, setSelectedCombo] = useState(null);

    useEffect(() => {
        dispatch(fetchComboData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteComboItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/combo/edit-combo/${id}`);
    };

    const handleInfoClick = (combo) => {
        setSelectedCombo(combo);
        // Show modal
        const modal = new window.bootstrap.Modal(document.getElementById('comboModal'));
        modal.show();
    };

    const filteredComboData = comboData.filter((combo) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            combo.name.toLowerCase().includes(searchTermLowerCase) ||
            combo.type.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComboData = filteredComboData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredComboData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h2>Combo Table</h2>

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
                    <button className="btn btn-success mb-3" onClick={() => navigate('/combo/create-combo')}>Add Combo</button>
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
                            <th>Type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentComboData.map((combo) => (
                            <tr key={combo.id}>
                                <td>{combo.id}</td>
                                <td>{combo.name}</td>
                                <td>{combo.price}</td>
                                <td>{combo.status}</td>
                                <td>
                                    {combo.imagePaths && combo.imagePaths.length > 0 && (
                                        <img
                                            src={`http://localhost:5265${combo.imagePaths[0]}`}
                                            alt={`Combo ${combo.id}`}
                                            style={{
                                                width: "100px",
                                                height: "100px",
                                                objectFit: "cover",
                                            }}
                                        />
                                    )}
                                </td>
                                <td>{combo.type}</td>
                                <td>
                                    <button
                                        className="btn btn-outline-primary"
                                        onClick={() => handleInfoClick(combo)}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(combo.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(combo.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for Combo Details */}
            <div className="modal fade" id="comboModal" tabIndex="-1" role="dialog" aria-labelledby="comboModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="comboModalLabel">
                                Combo Details: {selectedCombo ? selectedCombo.name : ''}
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
                            {selectedCombo && (
                                <div>
                                    <h5>Price:</h5>
                                    <p>{selectedCombo.price}</p>
                                    <h5>Status:</h5>
                                    <p>{selectedCombo.status}</p>
                                    <h5>Type:</h5>
                                    <p>{selectedCombo.type}</p>
                                    <h5>Image:</h5>
                                    {selectedCombo.imagePaths && selectedCombo.imagePaths.length > 0 ? (
                                        <img
                                            src={`http://localhost:5265${selectedCombo.imagePaths[0]}`}
                                            alt={`Combo ${selectedCombo.id}`}
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

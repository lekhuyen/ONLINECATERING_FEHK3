import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { deleteAdminDessertItem, fetchDessertData } from '../../redux/Restaurant/admindessertSlice';

export default function AdminDessert() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dessertData = useSelector((state) => state.admindessert?.items || []);
    const status = useSelector((state) => state.admindessert?.status || 'idle');
    const error = useSelector((state) => state.admindessert?.error || null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchDessertData());
    }, [dispatch]);

    const handleEdit = (id) => {
        navigate(`/dessert-admin/edit-dessert-admin/${id}`);
    };

    const filterBySearchTerm = (dessert) => {
        if (!dessert) return false; // Check if dessert is null or undefined
        const searchTermLowerCase = searchTerm.toLowerCase();
        const priceMatches = dessert.price?.toString().includes(searchTermLowerCase);
        const nameMatches = dessert.dessertName?.toLowerCase().includes(searchTermLowerCase);

        return nameMatches || priceMatches;
    };

    const filteredDessertData = dessertData.filter(filterBySearchTerm);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDessertData = filteredDessertData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredDessertData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Dessert Management</h2>

            <div className="row mb-3">
                <div>
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
            </div>

            <div>
                <button className="btn btn-success mb-3" onClick={() => navigate('/dessert-admin/create-dessert-admin')}>
                    Add Dessert
                </button>
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
                    {currentDessertData.map((dessert) => (
                        <tr key={dessert.id}>
                            <td>{dessert.id}</td>
                            <td>{dessert.dessertName}</td>
                            <td>{dessert.price || 'N/A'}</td> {/* Display 'N/A' if price is undefined */}
                            <td>
                                {dessert.dessertImage ? (
                                    <img
                                        src={dessert.dessertImage}
                                        alt={`Dessert ${dessert.id}`}
                                        style={{
                                            width: "100px",
                                            height: "100px",
                                            objectFit: "cover",
                                        }}
                                    />
                                ) : (
                                    'No Image'
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => handleEdit(dessert.id)}
                                >
                                    <HiOutlinePencilSquare />
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

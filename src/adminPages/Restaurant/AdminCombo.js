import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {  fetchComboData } from '../../redux/Restaurant/comboSlice';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';

export default function AdminCombo() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const comboData = useSelector((state) => state.combo.items);
    const comboStatus = useSelector((state) => state.combo.status);
    const error = useSelector((state) => state.combo.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchComboData());
    }, [dispatch]);



    const handleEdit = (id) => {
        navigate(`/combo-admin/edit-combo-admin/${id}`);
    };

    const filterBySearchTerm = (combo) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const nameMatches = combo.name?.toLowerCase().includes(searchTermLowerCase);
        const priceMatches = combo.price.toString().includes(searchTermLowerCase);
        const typeMatches = combo.type === parseInt(searchTermLowerCase); // Assuming type is an integer

        return nameMatches || priceMatches || typeMatches; // Add more conditions as needed
    };

    const filteredComboData = comboData.filter(filterBySearchTerm);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentComboData = filteredComboData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredComboData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (comboStatus === 'loading') {
        return <div>Loading...</div>;
    }

    if (comboStatus === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Combo Management</h2>

            <div className="row mb-3">
                <div>
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Price/Type:
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
                    <button className="btn btn-success mb-3" onClick={() => navigate('/combo-admin/create-combo-admin')}>
                        Add Combo
                    </button>
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
                        {currentComboData.map((combo) => (
                            <tr key={combo.id}>
                                <td>{combo.id}</td>
                                <td>{combo.name}</td>
                                <td>{combo.price}</td>
                                <td>{combo.status ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {combo.imagePath && combo.imagePath.length > 0 && (
                                        <img
                                            src={combo.imagePath}
                                            alt={`Dish ${combo.id}`}
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
                                        onClick={() => navigate(`/combo-admin/${combo.id}`)}
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(combo.id)}
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

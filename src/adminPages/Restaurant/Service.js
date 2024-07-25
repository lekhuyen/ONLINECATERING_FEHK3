import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteServiceItem, fetchServiceData } from '../../redux/Restaurant/ServiceSlice';

export default function Service() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const serviceData = useSelector((state) => state.service.items);
    const status = useSelector((state) => state.service.status);
    const error = useSelector((state) => state.service.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedService, setSelectedService] = useState(null);

    useEffect(() => {
        dispatch(fetchServiceData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteServiceItem(id));
    };

    const handleEdit = (id) => {
        // Navigate to edit service item page
        navigate(`/service/edit-service/${id}`);
    };

    const handleInfoClick = (service) => {
        setSelectedService(service);
    };

    const filteredServiceData = serviceData.filter((service) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            service.name.toLowerCase().includes(searchTermLowerCase) ||
            service.description.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentServiceData = filteredServiceData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredServiceData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h2>Service Table</h2>

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
                    <button className="btn btn-success mb-3" onClick={() => navigate('/service/create-service')}>Add Service</button>
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
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentServiceData.map((service) => (
                            <tr key={service.id}>
                                <td>{service.id}</td>
                                <td>{service.name}</td>
                                <td>{service.description}</td>
                                <td>{service.status ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {service.formFile && (
                                        <img
                                            src={`http://localhost:5265/${service.formFile}`}
                                            alt={`Service ${service.id}`}
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
                                        onClick={() => handleInfoClick(service)}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(service.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(service.id)}
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

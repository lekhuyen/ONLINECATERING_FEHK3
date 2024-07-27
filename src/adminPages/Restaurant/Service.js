import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteServiceItem, fetchServiceData } from '../../redux/Restaurant/ServiceSlice';

// Function to limit content to 10 words
const limitContent = (content) => {
    const words = content.split(' ');
    if (words.length > 10) {
        return words.slice(0, 10).join(' ') + '...';
    }
    return content;
};

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
        navigate(`/service/edit-service/${id}`);
    };

    const handleInfoClick = (service) => {
        setSelectedService(service);
        // Show modal
        const modal = new window.bootstrap.Modal(document.getElementById('serviceModal'));
        modal.show();
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
                                <td>{limitContent(service.description)}</td> {/* Apply limitContent here */}
                                <td>{service.status ? 'Active' : 'Inactive'}</td>
                                <td>
                                    {service.imagePath && (
                                        <img
                                            src={service.imagePath}
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

            {/* Modal for Service Details */}
            <div className="modal fade" id="serviceModal" tabIndex="-1" role="dialog" aria-labelledby="serviceModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="serviceModalLabel">
                                Service Details: {selectedService ? selectedService.name : ''}
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
                            {selectedService && (
                                <div>
                                    <h5>Description:</h5>
                                    <p>{selectedService.description}</p>
                                    <h5>Image:</h5>
                                    {selectedService.imagePath ? (
                                        <img
                                            src={selectedService.imagePath}
                                            alt={`Service ${selectedService.id}`}
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

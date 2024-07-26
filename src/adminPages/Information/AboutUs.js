import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAboutItem, fetchAboutData } from '../../redux/Information/aboutSlice';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsInfoCircle } from "react-icons/bs";
import { fetchAboutTypes, createAboutType, deleteAboutType, updateAboutType } from '../../redux/Information/aboutTypeSlice';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { IoMdCreate } from 'react-icons/io';

function AboutUs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const aboutData = useSelector((state) => state.about.items);
    const aboutTypeData = useSelector((state) => state.aboutTypes?.items || []);
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [selectedAboutUs, setSelectedAboutUs] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [newAboutTypeName, setNewAboutTypeName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        dispatch(fetchAboutData());
        dispatch(fetchAboutTypes());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteAboutItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/aboutus/edit-aboutus/${id}`);
    };

    const handleInfoClick = (aboutus) => {
        setSelectedAboutUs(aboutus);
    };

    const handleDeleteType = (id) => {
        if (window.confirm("Are you sure you want to delete this About Type?")) {
            dispatch(deleteAboutType(id));
        }
    };

    const handleEditType = async (id, newName) => {
        const updatedType = { id, aboutTypeName: newName };
        try {
            const response = await fetch(`http://localhost:5034/api/About/abouttypes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedType),
            });
            if (response.ok) {
                // Assuming the response returns updated data, you may dispatch an action
                // to update your Redux store if needed.
                dispatch(updateAboutType(updatedType)); // Assuming you have an action like this in your redux
                // Or you can re-fetch the types after successful update
                dispatch(fetchAboutTypes());
            } else {
                console.error('Failed to edit About Type:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing About Type:', error);
        }
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAboutData = aboutData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(aboutData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const limitContent = (content) => {
        const words = content.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return content;
    };

    const filteredAboutData = currentAboutData.filter((about) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            about.title.toLowerCase().includes(searchTermLowerCase) ||
            about.content.toLowerCase().includes(searchTermLowerCase) ||
            about.aboutTypeName.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleAddAboutType = async () => {
        if (!newAboutTypeName.trim()) return;
        
        setIsSubmitting(true);
        try {
            await dispatch(createAboutType({ aboutTypeName: newAboutTypeName }));
            setNewAboutTypeName("");
        } catch (error) {
            console.error('Error adding about type:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h2>About Us Content</h2>

            <div className="row mb-3">
                <div className="col-sm-9">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Title/Content/Type:
                    </label>
                    <div className="input-group">
                        <input
                            type="text"
                            id="searchTerm"
                            className="form-control"
                            value={searchTerm}
                            onChange={handleSearchChange}
                            placeholder="Type to search..."
                        />
                        <button className="btn btn-outline-secondary" type="button">
                            Search
                        </button>
                    </div>
                </div>

                <div className="col-sm-3">
                    <label htmlFor="aboutType" className="form-label">
                        About Type
                    </label>
                    <div className="d-flex">
                        <button
                            type="button"
                            className="btn btn-info btn-lg me-3"
                            data-bs-toggle="modal"
                            data-bs-target="#TypeModal"
                        >
                            Create About Type
                        </button>
                    </div>
                </div>
            </div>

            <button className="btn btn-success mb-3" onClick={() => navigate('/aboutus/create-aboutus')}>Add About Us</button>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Content</th>
                            <th>AboutTypeName</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAboutData.map((about) => (
                            <tr key={about.id}>
                                <td>{about.id}</td>
                                <td>{about.title}</td>
                                <td>{limitContent(about.content)}</td>
                                <td>{about.aboutTypeName}</td>
                                <td>
                                    {about.imagePaths && about.imagePaths.length > 0 && (
                                        <img
                                            src={`http://localhost:5034${about.imagePaths[0]}`}
                                            alt={`About ${about.id}`}
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
                                        onClick={() => handleInfoClick(about)}
                                        data-toggle="modal"
                                        data-target="#myModal"
                                    >
                                        <BsInfoCircle />
                                    </button>
                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(about.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(about.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal for About Details */}
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title float-start">
                                News Title: {selectedAboutUs && selectedAboutUs.title}
                            </h4>
                            <button
                                type="button"
                                className="btn btn-danger float-end"
                                data-dismiss="modal"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedAboutUs && (
                                <div>
                                    <h5>News Content:</h5>
                                    <p>{selectedAboutUs.content}</p>
                                    <h5>News Image(s):</h5>
                                    {selectedAboutUs.imagePaths && selectedAboutUs.imagePaths.length > 0 ? (
                                        selectedAboutUs.imagePaths.map((imagePath, index) => (
                                            <img
                                                key={index}
                                                src={`http://localhost:5034${imagePath}`}
                                                alt={`News ${selectedAboutUs.id}`}
                                                style={{
                                                    width: "20%",
                                                    height: "auto",
                                                    marginBottom: "10px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ))
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Create About Type */}
            <div className='container'>

                <div className="modal fade" id="TypeModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Type of About Us</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>About Type Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {aboutTypeData.map((type) => (
                                            <tr key={type.id}>
                                                <td>{type.aboutTypeName}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => handleEditType(type.id, prompt("Enter new name"))}
                                                    >
                                                        <HiOutlinePencilSquare />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleDeleteType(type.id)}
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label htmlFor="newAboutTypeName">New About Type Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="newAboutTypeName"
                                        value={newAboutTypeName}
                                        onChange={(e) => setNewAboutTypeName(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleAddAboutType}
                                    disabled={isSubmitting}
                                >
                                    <IoMdCreate /> {isSubmitting ? 'Adding...' : 'Add Type'}
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
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

export default AboutUs;

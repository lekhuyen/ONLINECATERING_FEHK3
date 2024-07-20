import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteAboutItem, fetchAboutData } from '../../redux/Information/aboutSlice';

function AboutUs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selecting state from Redux store
    const aboutData = useSelector((state) => state.about.items);
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Number of items per page

    // State to track selected news item for modal display
    const [selectedAboutUs, setSelectedAboutUs] = useState(null);

    // State for search and date filtering
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        dispatch(fetchAboutData());
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            dispatch(deleteAboutItem(id));
        } catch (error) {
            console.error('Error deleting item:', error);
            // Add additional error handling if needed (e.g., showing a notification to the user)
        }
    };

    const handleEdit = (id) => {
        navigate(`/aboutus/edit-aboutus/${id}`);
    };

    // Function to handle click on the info icon
    const handleInfoClick = (aboutus) => {
        setSelectedAboutUs(aboutus);
        // You can also trigger modal open programmatically here if needed
    };

    // Pagination logic
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAboutData = aboutData.slice(indexOfFirstItem, indexOfLastItem);

    // Calculate total pages for pagination
    const pageNumbers = Math.ceil(aboutData.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Function to limit content to at least 10 words with ellipses
    const limitContent = (content) => {
        const words = content.split(' ');
        if (words.length > 10) {
            return words.slice(0, 10).join(' ') + '...';
        }
        return content;
    };

    // Filtering logic based on search term and selected date
    const filteredAboutData = currentAboutData.filter((about) => {
        // Filter by search term (case insensitive)
        const searchTermLowerCase = searchTerm.toLowerCase();
        if (
            about.title.toLowerCase().includes(searchTermLowerCase) ||
            about.content.toLowerCase().includes(searchTermLowerCase)
        )
        return false;
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    

    // Handling initial loading state
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    // Handling fetch error state
    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    // Ensure aboutData is always an array before mapping over it
    if (!Array.isArray(aboutData)) {
        return null; // or handle the case where aboutData is not an array
    }

    return (
        <div className='container'>
            <h2>About Us Content</h2>

            <div className="row mb-3">
                <div className="col-sm-12">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Title/Content/TypeNews:
                    </label>
                    <input
                        type="text"
                        id="searchTerm"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}  placeholder='Type to search...'
                    />
                </div>
                
            </div>

            <button className="btn btn-success mb-3" onClick={() => navigate('/aboutus/create-aboutus')}>Create About Us</button>
            <table className="table table-dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Content</th>
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
                            <td>
                                {about.imagePaths && about.imagePaths.length > 0 && (
                                    <img
                                        src={`http://localhost:5034${about.imagePaths[0]}`}
                                        alt={`About ${about.id}`}
                                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
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
                                    <i className="fa fa-info-circle" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => handleEdit(about.id)}
                                >
                                    <i className="fa fa-pencil-square" aria-hidden="true"></i>
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(about.id)}
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    {/* Modal content */}
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
                                    {selectedAboutUs.imagePaths &&
                                        selectedAboutUs.imagePaths.length > 0 ? (
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

            {/* Pagination */}
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

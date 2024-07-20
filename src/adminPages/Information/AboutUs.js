import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteAboutItem, fetchAboutData } from '../../redux/Information/aboutSlice';

function AboutUs() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const aboutData = useSelector((state) => state.about.items);
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [selectedAboutUs, setSelectedAboutUs] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchAboutData());
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
            about.content.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    if (!Array.isArray(aboutData)) {
        return null;
    }

    return (
        <div className='container'>
            <h2>About Us Content</h2>

            <div className="row mb-3">
                <div className="col-sm-12">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Title/Content:
                    </label>
                    <input
                        type="text"
                        id="searchTerm"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder='Type to search...'
                    />
                </div>
            </div>

            <button className="btn btn-success mb-3" onClick={() => navigate('/aboutus/create-aboutus')}>Create About Us</button>

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
            </div>

            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title float-start">
                                About Title: {selectedAboutUs && selectedAboutUs.title}
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
                                    <h5>About Content:</h5>
                                    <p>{selectedAboutUs.content}</p>
                                    <h5>About Image(s):</h5>
                                    {selectedAboutUs.imagePaths &&
                                        selectedAboutUs.imagePaths.length > 0 ? (
                                            selectedAboutUs.imagePaths.map((imagePath, index) => (
                                                <img
                                                    key={index}
                                                    src={`http://localhost:5034${imagePath}`}
                                                    alt={`About ${selectedAboutUs.id}`}
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

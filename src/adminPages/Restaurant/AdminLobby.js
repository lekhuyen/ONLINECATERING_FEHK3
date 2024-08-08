import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { fetchLobbies, deleteLobby } from '../../redux/Restaurant/adminlobbySlice';
import styles from './AdminLobby.module.scss'; // Ensure to have your SCSS file

const AdminLobby = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lobbies = useSelector((state) => state.adminLobby?.lobbies || []);
    const status = useSelector((state) => state.adminLobby?.status || 'idle');
    const error = useSelector((state) => state.adminLobby?.error || null);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLobby, setSelectedLobby] = useState(null);
    const [showDetailModal, setShowDetailModal] = useState(false);

    useEffect(() => {
        dispatch(fetchLobbies());
    }, [dispatch]);

    const handleEdit = (id) => {
        navigate(`/lobby-admin/edit-lobby-admin/${id}`);
    };

    const handleInfoClick = (lobby) => {
        setSelectedLobby(lobby);
        setShowDetailModal(true);
    };

    const limitContent = (content, maxLength = 100) => {
        return content.length <= maxLength ? content : content.substring(0, maxLength) + '...';
    };

    const filteredLobbies = Array.isArray(lobbies) ? lobbies.filter((lobby) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        
        const lobbyName = lobby.lobbyName?.toLowerCase() || '';
        const description = lobby.description?.toLowerCase() || '';
        const area = lobby.area?.toLowerCase() || '';
    
        return (
            lobbyName.includes(searchTermLowerCase) ||
            description.includes(searchTermLowerCase) ||
            area.includes(searchTermLowerCase)
        );
    }) : [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLobbies = filteredLobbies.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredLobbies.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='container'>
            <h2>Lobby Table</h2>

            <div className="row mb-3">
                <div>
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Description/Area:
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
                <button className="btn btn-success mb-3" onClick={() => navigate('/lobby-admin/create-lobby-admin')}>Add Lobby</button>
            </div>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Lobby Name</th>
                            <th>Description</th>
                            <th>Area</th>
                            <th>Type</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentLobbies.map((lobby) => {
                            const images = (lobby.lobbyImages && lobby.lobbyImages.$values) || [];

                            return (
                                <tr key={lobby.id}>
                                    <td>{lobby.id}</td>
                                    <td>{lobby.lobbyName || 'N/A'}</td>
                                    <td>{limitContent(lobby.description || '')}</td>
                                    <td>{lobby.area || 'N/A'}</td>
                                    <td>{lobby.type || 'N/A'}</td>
                                    <td>{lobby.price || 'N/A'}</td>
                                    <td>
                                        {images.length > 0 ? (
                                            <img
                                                src={images[0]?.imagesUrl || ''}
                                                alt={`Lobby ${lobby.id}`}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ) : (
                                            <p>No image available</p>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleInfoClick(lobby)}
                                        >
                                            <BsInfoCircle />
                                        </button>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(lobby.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            {/* Custom Modal for Lobby Details */}
            {showDetailModal && (
                <div className={styles['modal-overlay']} role="dialog">
                    <div className={styles['modal-dialog']} role="document">
                        <div className={styles['modal-content']}>
                            <div className={styles['modal-header']}>
                                <h4 className="modal-title">
                                    Lobby Details: {selectedLobby && selectedLobby.lobbyName}
                                </h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className={styles['modal-body']}>
                                {selectedLobby && (
                                    <div>
                                        <h5>Description:</h5>
                                        <p>{selectedLobby.description}</p>
                                        <h5>Images:</h5>
                                        {selectedLobby.lobbyImages && selectedLobby.lobbyImages.$values && selectedLobby.lobbyImages.$values.length > 0 ? (
                                            selectedLobby.lobbyImages.$values.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image.imagesUrl}
                                                    alt={`Lobby ${selectedLobby.id}`}
                                                    className={styles.image} // Apply custom image style
                                                />
                                            ))
                                        ) : (
                                            <p>No images available</p>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={styles['modal-footer']}>
                                <button
                                    type="button"
                                    className="btn btn-danger"
                                    onClick={() => setShowDetailModal(false)}
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
};

export default AdminLobby;

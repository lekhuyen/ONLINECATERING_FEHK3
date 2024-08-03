import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { fetchLobbies, deleteLobby } from '../../redux/Restaurant/adminlobbySlice';

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

    useEffect(() => {
        dispatch(fetchLobbies());
        
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            await dispatch(deleteLobby(id)).unwrap();
        } catch (error) {
            console.error("Error deleting lobby:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/lobby-admin/edit-lobby-admin/${id}`);
    };

    const handleInfoClick = (lobby) => {
        console.log(`Viewing info for lobby:`, lobby);
        setSelectedLobby(lobby);
        const modal = new window.bootstrap.Modal(document.getElementById('lobbyModal'));
        modal.show();
    };

    const closeModal = () => {
        const modal = new window.bootstrap.Modal(document.getElementById('lobbyModal'));
        modal.hide();
        setSelectedLobby(null);
    };

    const limitContent = (content, maxLength = 100) => {
        return content.length <= maxLength ? content : content.substring(0, maxLength) + '...';
    };

    const filteredLobbies = Array.isArray(lobbies) ? lobbies.filter((lobby) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        
        // Ensure properties are strings and not undefined
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
                                console.log('Rendering lobby:', lobby); // Log information for each lobby

                                // Accessing images array inside `$values` if available
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
    {lobby.lobbyImages && lobby.lobbyImages.$values && lobby.lobbyImages.$values.length > 0 ? (
        <img
            src={lobby.lobbyImages.$values[0]?.imagesUrl || ''}
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
                                            <button
                                                className="btn btn-outline-danger"
                                                onClick={() => handleDelete(lobby.id)}
                                            >
                                                <FaRegTrashAlt />
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="lobbyModal" tabIndex="-1" role="dialog" aria-labelledby="lobbyModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title" id="lobbyModalLabel">
                                Lobby Details: {selectedLobby ? selectedLobby.lobbyName : ''}
                            </h4>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                onClick={() => {
                                    console.log('Modal close button clicked');
                                    closeModal();
                                }}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {selectedLobby ? (
                                <div>
                                    <h5>Description:</h5>
                                    <p>{selectedLobby.description}</p>
                                    <h5>Images:</h5>
                                    {selectedLobby.lobbyImages && selectedLobby.lobbyImages.$values && selectedLobby.lobbyImages.$values.length > 0 ? (
                                        <div>
                                            {selectedLobby.lobbyImages.$values.map((image, index) => {
                                                console.log(`Rendering image ${index}:`, image.imagesUrl);
                                                return (
                                                    <div
                                                        key={index}
                                                        className="position-relative"
                                                        style={{ width: '20%', marginRight: '10px', marginBottom: '10px' }}
                                                    >
                                                        <img
                                                            src={image.imagesUrl}
                                                            alt={`Lobby ${selectedLobby.id}`}
                                                            style={{
                                                                width: '100%',
                                                                height: 'auto',
                                                                objectFit: 'cover',
                                                            }}
                                                        />
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ) : (
                                        <p>No images available</p>
                                    )}
                                </div>
                            ) : (
                                <p>No lobby data available</p>
                            )}
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                onClick={() => console.log('Modal close button clicked from footer')}
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
};

export default AdminLobby;

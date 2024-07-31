// AdminLobby.js

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import { deleteLobbyItem, fetchLobbyData } from '../../redux/Restaurant/adminlobbySlice';
import { fetchLobbyImages } from '../../redux/Restaurant/adminlobbyimageSlice';

const limitContent = (content) => {
    const words = content.split(' ');
    if (words.length > 10) {
        return words.slice(0, 10).join(' ') + '...';
    }
    return content;
};

export default function AdminLobby() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const lobbyState = useSelector((state) => state.lobby || {});
    const lobbyData = lobbyState.items || [];
    const status = lobbyState.status;
    const error = lobbyState.error;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");

    const [selectedLobby, setSelectedLobby] = useState(null);
    const [lobbyImages, setLobbyImages] = useState([]);
    const [imagesStatus, setImagesStatus] = useState("idle");
    const [imagesError, setImagesError] = useState(null);

    useEffect(() => {
        dispatch(fetchLobbyData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteLobbyItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/lobby-admin/edit-lobby-admin/${id}`);
    };

    const handleInfoClick = async (lobby) => {
        setSelectedLobby(lobby);
        console.log("Selected lobby:", lobby); // Add this console.log statement
    
        try {
            setImagesStatus("loading");
            const action = await dispatch(fetchLobbyImages(lobby.id));
            setLobbyImages(action.payload);
            setImagesStatus("succeeded");
        } catch (error) {
            setImagesStatus("failed");
            setImagesError(error.message);
            console.error("Error fetching images:", error);
        }
    
        const modal = new window.bootstrap.Modal(document.getElementById('lobbyModal'));
        modal.show();
    };
    

    const filteredLobbyData = lobbyData.filter((lobby) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            lobby.lobbyName.toLowerCase().includes(searchTermLowerCase) ||
            lobby.description.toLowerCase().includes(searchTermLowerCase) ||
            lobby.area.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentLobbyData = filteredLobbyData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredLobbyData.length / itemsPerPage);
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
                        {currentLobbyData.map((lobby) => (
                            <tr key={lobby.id}>
                                <td>{lobby.id}</td>
                                <td>{lobby.lobbyName}</td>
                                <td>{limitContent(lobby.description)}</td>
                                <td>{lobby.area}</td>
                                <td>{lobby.type}</td>
                                <td>{lobby.price}</td>
                                <td>
                                    {lobby.lobbyImages && lobby.lobbyImages.$values.length > 0 && (
                                        <img
                                            src={lobby.lobbyImages.$values[0].imagesUrl}
                                            alt={`Lobby ${lobby.id}`}
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
                        ))}
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
                                className="btn btn-danger"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedLobby && (
                                <div>
                                    <h5>Description:</h5>
                                    <p>{selectedLobby.description}</p>
                                    <h5>Images:</h5>
                                    {imagesStatus === "loading" && <p>Loading images...</p>}
                                    {imagesStatus === "failed" && <p>{imagesError}</p>}
                                    {lobbyImages && lobbyImages.length > 0 ? (
                                        <div className="d-flex flex-wrap">
                                            {lobbyImages.map((image, index) => (
                                                    <img
                                                    key={index}
                                                    src={image} // Assuming lobbyImages is an array of image URLs
                                                    alt={`Lobby ${selectedLobby.id}`}
                                                    style={{
                                                        width: "20%",
                                                        height: "auto",
                                                        objectFit: "cover",
                                                        marginRight: "10px",
                                                        marginBottom: "10px"
                                                    }}
                                                />
                                            ))}
                                        </div>
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

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAccountsData, editUserStatus } from '../../redux/Accounts/accountsSlice';
import styles from './Accounts.module.scss'; // Import your custom styles
import { useNavigate } from 'react-router-dom';

const Accounts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accountsData = useSelector((state) => state.accounts.items || []);
    const status = useSelector((state) => state.accounts.status);
    const error = useSelector((state) => state.accounts.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAccountsData, setFilteredAccountsData] = useState([]);

    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        dispatch(fetchAccountsData());
    }, [dispatch]);

    useEffect(() => {
        setFilteredAccountsData(accountsData);
    }, [accountsData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentAccountsData = filteredAccountsData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredAccountsData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        filterAccounts(e.target.value);
    };

    const filterAccounts = (searchTerm) => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        const filteredData = accountsData.filter((account) =>
            account.userName.toLowerCase().includes(lowerCaseSearchTerm) ||
            account.userEmail.toLowerCase().includes(lowerCaseSearchTerm) ||
            account.phone.toLowerCase().includes(lowerCaseSearchTerm)
        );
        setFilteredAccountsData(filteredData);
        setCurrentPage(1);
    };

    const handleStatusToggle = (id, currentStatus) => {
        if (!id) return; // Ensure id is valid
    
        const newStatus = !currentStatus;
        const action = newStatus ? 'ban' : 'activate';
    
        setSelectedUser({ id, newStatus, action });
        setShowModal(true);
    };

    const confirmStatusToggle = () => {
        if (selectedUser) {
            const { id, newStatus } = selectedUser;

            dispatch(editUserStatus({ id, newStatus }))
                .then(() => console.log(`User status updated successfully for user with id ${id}`))
                .catch((error) => console.error('Error updating user status:', error));

            setShowModal(false);
        }
    };

    const handleCloseModal = () => setShowModal(false);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Accounts Management</h2>
            <div className="row mb-3">
                <div className="col-sm-9">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Username/Email/Phone:
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
            </div>

            <button className="btn btn-success mb-3" onClick={() => navigate('/admin-accounts/create-admin-accounts')}>Add Account</button>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>UserName</th>
                            <th>UserEmail</th>
                            <th>Phone</th>
                            <th>Role</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAccountsData.map((account) => (
                            <tr key={account.id || 'default-key'}>
                                <td>{account.id}</td>
                                <td>{account.userName}</td>
                                <td>{account.userEmail}</td>
                                <td>{account.phone}</td>
                                <td>{account.role}</td>
                                <td>
                                    <button
                                        className={`btn btn-sm ${account.status ? 'btn-danger' : 'btn-success '}`}
                                        onClick={() => handleStatusToggle(account.id, account.status)}
                                    >
                                        {account.status ? 'Banned' : 'Active'}
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

            {/* Modal for Confirmation */}
            <div className={`${styles.modal} ${showModal ? styles.show : ''}`} id="statusModal" tabIndex="-1" role="dialog" aria-labelledby="statusModalLabel" aria-hidden={!showModal}>
                <div className={`${styles.modalDialog}`} role="document">
                    <div className={`${styles.modalContent}`}>
                        <div className={`${styles.modalHeader}`}>
                            <h5 className={`${styles.modalTitle}`} id="statusModalLabel">Confirm Account Status Change</h5>
                            <button type="button" className={`${styles.close}`} onClick={handleCloseModal} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className={`${styles.modalBody}`}>
                            {selectedUser && (
                                <p>Are you sure you want to {selectedUser.action} this account?</p>
                            )}
                        </div>
                        <div className={`${styles.modalFooter}`}>
                            <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancel</button>
                            <button type="button" className="btn btn-primary" onClick={confirmStatusToggle}>Confirm</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accounts;

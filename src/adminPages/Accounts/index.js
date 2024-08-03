import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { fetchAccountsData, editUserStatus } from '../../redux/Accounts/accountsSlice';

const Accounts = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const accountsData = useSelector((state) => state.accounts.items);
    const status = useSelector((state) => state.accounts.status);
    const error = useSelector((state) => state.accounts.error);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredAccountsData, setFilteredAccountsData] = useState([]);

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

    const toggleStatus = (id, currentStatus) => {
        const newStatus = !currentStatus; // Toggle the current status
        const action = newStatus ? 'activate' : 'ban';

        if (window.confirm(`Are you sure you want to ${action} this user?`)) {
            console.log(`Toggling status for user with id ${id} to ${newStatus}`);

            dispatch(editUserStatus({ id, newStatus }))
                .then(() => console.log(`User status updated successfully for user with id ${id}`))
                .catch((error) => console.error('Error updating user status:', error));
        }
    };

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

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>UserName</th>
                            <th>UserEmail</th>
                            <th>Phone</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentAccountsData.map((account) => (
                            <tr key={account.id}>
                                <td>{account.id}</td>
                                <td>{account.userName}</td>
                                <td>{account.userEmail}</td>
                                <td>{account.phone}</td>
                                <td>
                                    <button
                                        className={`btn btn-sm ${account.status ? 'btn-success' : 'btn-danger'}`}
                                        onClick={() => toggleStatus(account.id, account.status)}
                                    >
                                        {account.status ? 'Active' : 'Banned'}
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
};

export default Accounts;

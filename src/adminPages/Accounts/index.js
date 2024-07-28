import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { BsInfoCircle } from 'react-icons/bs';
import { deleteAccount, fetchAccountsData } from '../../redux/Accounts/accountsSlice';


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

    // const handleDelete = (id) => {
    //     if (window.confirm("Are you sure you want to delete this account?")) {
    //         dispatch(deleteAccount(id));
    //     }
    // };

    const handleEdit = (id) => {

        navigate(`/admin-accounts/edit-admin-accounts/${id}`);
    };



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
        setCurrentPage(1); // Reset pagination to first page when filtering
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
                            <th>Actions</th>
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
                                    {account.status ? (
                                        <span className="badge bg-success">Active</span>
                                    ) : (
                                        <span className="badge bg-danger">Banned</span>
                                    )}
                                </td>
                                <td>

                                    <button
                                        className="btn btn-outline-warning"
                                        onClick={() => handleEdit(account.id)}
                                    >
                                        <HiOutlinePencilSquare />
                                    </button>
                                    {/* <button
                                        className="btn btn-outline-danger"
                                        onClick={() => handleDelete(account.id)}
                                    >
                                        <FaRegTrashAlt />
                                    </button> */}
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

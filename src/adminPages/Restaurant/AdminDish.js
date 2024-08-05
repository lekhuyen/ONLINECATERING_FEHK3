import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { deleteDishItem, fetchDishData } from '../../redux/Restaurant/dishSlice';
import { fetchCustomComboData } from '../../redux/Restaurant/customComboSlice';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

export default function AdminDish() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const dishData = useSelector((state) => state.dish.items);
    const status = useSelector((state) => state.dish.status);
    const error = useSelector((state) => state.dish.error);
    const customComboData = useSelector((state) => state.customCombo.customCombos);
    const comboStatus = useSelector((state) => state.customCombo.status);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        dispatch(fetchDishData());
        dispatch(fetchCustomComboData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteDishItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/dish-admin/edit-dish-admin/${id}`);
    };

    const filterBySearchTerm = (dish) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        const priceMatches = dish.price.toString().includes(searchTermLowerCase);
        const statusMatches = dish.status ? 'active'.includes(searchTermLowerCase) : 'inactive'.includes(searchTermLowerCase);
        const nameMatches = dish.name?.toLowerCase().includes(searchTermLowerCase);
        const typeMatches = dish.type?.toLowerCase().includes(searchTermLowerCase);

        return nameMatches || priceMatches || statusMatches || typeMatches;
    };

    const filteredDishData = dishData.filter(filterBySearchTerm);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentDishData = filteredDishData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredDishData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container mt-5">
            <h2>Dish Management</h2>

            <div className="row mb-3">
                <div>
                    <label htmlFor="searchTerm" className="form-label">
                        Search Name/Price/Status:
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
                <button className="btn btn-success mb-3" onClick={() => navigate('/dish-admin/create-dish-admin')}>
                    Add Dish
                </button>
            </div>

            <div className="container mt-5">
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentDishData.map((dish) => {
                            console.log('Dish:', dish); // Log dish object to check image URL
                            return (
                                <tr key={dish.id}>
                                    <td>{dish.id}</td>
                                    <td>{dish.name}</td>
                                    <td>{dish.price}</td>
                                    <td>{dish.status ? 'Active' : 'Inactive'}</td>
                                    <td>
                                        {dish.image && dish.image.length > 0 ? (
                                            <img
                                                src={dish.image}
                                                alt={`Dish ${dish.id}`}
                                                style={{
                                                    width: "100px",
                                                    height: "100px",
                                                    objectFit: "cover",
                                                }}
                                                onError={(e) => {
                                                    console.error('Image failed to load:', e.target.src);
                                                    e.target.style.display = 'none'; // Hide broken image
                                                }}
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-warning"
                                            onClick={() => handleEdit(dish.id)}
                                        >
                                            <HiOutlinePencilSquare />
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleDelete(dish.id)}
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

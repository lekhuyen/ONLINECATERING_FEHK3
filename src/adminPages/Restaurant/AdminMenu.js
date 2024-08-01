import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import { deleteMenuItem, fetchMenuData } from '../../redux/Restaurant/adminmenuSlice';
import { fetchMenuImages } from '../../redux/Restaurant/adminmenuimageSlice';


const AdminTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuState = useSelector((state) => state.menu || {});
    const { items: menuData, status, error } = menuState;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState('');


    useEffect(() => {
        dispatch(fetchMenuData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteMenuItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/menu-admin/edit-menu-admin/${id}`);
    };

    const filteredMenuData = menuData.filter((menu) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            menu.menuName.toLowerCase().includes(searchTermLowerCase) ||
            menu.description.toLowerCase().includes(searchTermLowerCase) ||
            menu.category.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentMenuData = filteredMenuData.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = Math.ceil(filteredMenuData.length / itemsPerPage);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === 'loading') return <div>Loading...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div className='container'>
            <h2>Menu Table</h2>

            <div className='row mb-3'>
                <div>
                    <label htmlFor='searchTerm' className='form-label'>
                        Search Name/Description/Category:
                    </label>
                    <div className='input-group'>
                        <input
                            type='text'
                            id='searchTerm'
                            className='form-control'
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder='Type to search...'
                        />
                        <button className='btn btn-outline-secondary' type='button'>
                            Search
                        </button>
                    </div>
                </div>
            </div>

            <div>
                <button className='btn btn-success mb-3' onClick={() => navigate('/menu-admin/create-menu-admin')}>
                    Add Menu
                </button>
            </div>

            <div className='container mt-5'>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Menu Name</th>
                            <th>Ingredient</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMenuData.map((menu) => (
                            <tr key={menu.id}>
                                <td>{menu.id}</td>
                                <td>{menu.menuName}</td>
                                <td>{menu.ingredient}</td>
                                <td>{menu.price}</td>
                                <td>{menu.quantity}</td>
                                <td>
                                    {menu.menuImages && menu.menuImages.$values.length > 0 && (
                                        <img
                                            src={menu.menuImages.$values[0].imagesUrl}
                                            alt={`Menu ${menu.id}`}
                                            style={{
                                                width: '100px',
                                                height: '100px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    )}
                                </td>
                                <td>


                                    <button className='btn btn-outline-warning' onClick={() => handleEdit(menu.id)}>
                                        <HiOutlinePencilSquare />
                                    </button>
                                    <button className='btn btn-outline-danger' onClick={() => handleDelete(menu.id)}>
                                        <FaRegTrashAlt />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            

            <nav>
                <ul className='pagination'>
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className='page-link' onClick={() => paginate(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: pageNumbers }, (_, index) => (
                        <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                            <button className='page-link' onClick={() => paginate(index + 1)}>
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === pageNumbers ? 'disabled' : ''}`}>
                        <button className='page-link' onClick={() => paginate(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default AdminTable;

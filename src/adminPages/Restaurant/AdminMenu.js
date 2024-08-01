import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaRegTrashAlt } from 'react-icons/fa';
import { BsInfoCircle } from 'react-icons/bs';
import { HiOutlinePencilSquare } from 'react-icons/hi2';

import { deleteMenuItem, fetchMenuData } from '../../redux/Restaurant/adminmenuSlice';
import { fetchMenuImages } from '../../redux/Restaurant/adminmenuimageSlice';

const limitContent = (content) => {
    const words = content.split(' ');
    if (words.length > 10) {
        return words.slice(0, 10).join(' ') + '...';
    }
    return content;
};

const AdminTable = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const menuState = useSelector((state) => state.menu || {});
    const { items: menuData, status, error } = menuState;

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const [searchTerm, setSearchTerm] = useState('');

    const [selectedMenu, setSelectedMenu] = useState(null);
    const [menuImages, setMenuImages] = useState([]);
    const [imagesStatus, setImagesStatus] = useState('idle');
    const [imagesError, setImagesError] = useState(null);

    useEffect(() => {
        dispatch(fetchMenuData());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteMenuItem(id));
    };

    const handleEdit = (id) => {
        navigate(`/menu-admin/edit-menu-admin/${id}`);
    };

    const handleInfoClick = async (menu) => {
        setSelectedMenu(menu);
        console.log('Selected menu:', menu);

        try {
            setImagesStatus('loading');
            const action = await dispatch(fetchMenuImages(menu.id));
            setMenuImages(action.payload);
            setImagesStatus('succeeded');
        } catch (error) {
            setImagesStatus('failed');
            setImagesError(error.message);
            console.error('Error fetching images:', error);
        }

        const modal = new window.bootstrap.Modal(document.getElementById('menuModal'));
        modal.show();
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

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>;
    }

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
                            <th>Description</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentMenuData.map((menu) => (
                            <tr key={menu.id}>
                                <td>{menu.id}</td>
                                <td>{menu.menuName}</td>
                                <td>{limitContent(menu.description)}</td>
                                <td>{menu.category}</td>
                                <td>{menu.price}</td>
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
                                    <button className='btn btn-outline-primary' onClick={() => handleInfoClick(menu)}>
                                        <BsInfoCircle />
                                    </button>
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

            <div className='modal fade' id='menuModal' tabIndex='-1' role='dialog' aria-labelledby='menuModalLabel' aria-hidden='true'>
                <div className='modal-dialog modal-lg'>
                    <div className='modal-content'>
                        <div className='modal-header'>
                            <h4 className='modal-title' id='menuModalLabel'>
                                Menu Details: {selectedMenu ? selectedMenu.menuName : ''}
                            </h4>
                            <button type='button' className='btn btn-danger' data-bs-dismiss='modal' aria-label='Close'>
                                <span aria-hidden='true'>&times;</span>
                            </button>
                        </div>
                        <div className='modal-body'>
                            {selectedMenu && (
                                <div>
                                    <h5>Description:</h5>
                                    <p>{selectedMenu.description}</p>
                                    <h5>Images:</h5>
                                    {imagesStatus === 'loading' && <p>Loading images...</p>}
                                    {imagesStatus === 'failed' && <p>{imagesError}</p>}
                                    {menuImages && menuImages.length > 0 ? (
                                        <div className='d-flex flex-wrap'>
                                            {menuImages.map((image, index) => (
                                                <img
                                                    key={index}
                                                    src={image} // Assuming menuImages is an array of image URLs
                                                    alt={`Menu ${selectedMenu.id}`}
                                                    style={{
                                                        width: '20%',
                                                        height: 'auto',
                                                        objectFit: 'cover',
                                                        marginRight: '10px',
                                                        marginBottom: '10px',
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

                        <div className='modal-footer'>
                            <button type='button' className='btn btn-danger' data-bs-dismiss='modal'>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
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

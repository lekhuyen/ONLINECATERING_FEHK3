import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { fetchNewsData, deleteNewsItem } from "../../redux/Information/newsSlice";
import { fetchNewsTypes, editNewsType, deleteNewsType, createNewsType } from "../../redux/Information/newsTypeSlice";
import styles from './News.module.scss'; // Import your SCSS file

function NewsAd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const newsData = useSelector((state) => state.news.items);
    const newsTypeData = useSelector((state) => state.newsTypes.items);
    const status = useSelector((state) => state.news.status);
    const error = useSelector((state) => state.news.error);

    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 3;

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedNews, setSelectedNews] = useState(null);
    const [addNewsTypeName, setAddNewsTypeName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [showDetailModal, setShowDetailModal] = useState(false);
    const [showTypeModal, setShowTypeModal] = useState(false);

    useEffect(() => {
        dispatch(fetchNewsData());
        dispatch(fetchNewsTypes());
    }, [dispatch]);

    const handleDelete = async (id) => {
        try {
            dispatch(deleteNewsItem(id));
        } catch (error) {
            console.error("Error deleting item:", error);
        }
    };

    const handleEdit = (id) => {
        navigate(`/newsadmin/edit-news/${id}`);
    };

    const handleAddNewsType = async () => {
        if (!addNewsTypeName.trim()) return;
        
        setIsSubmitting(true);
        try {
            await dispatch(createNewsType({ newsTypeName: addNewsTypeName }));
            setAddNewsTypeName("");
            setShowTypeModal(false);
        } catch (error) {
            console.error('Error adding news type:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEditType = async (id, newName) => {
        const updatedType = { id, newsTypeName: newName };
        try {
            const response = await fetch(`http://localhost:5034/api/News/newtypes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedType),
            });
            if (response.ok) {
                dispatch(editNewsType(updatedType));
                dispatch(fetchNewsTypes());
            } else {
                console.error('Failed to edit News Type:', response.statusText);
            }
        } catch (error) {
            console.error('Error editing News Type:', error);
        }
    };

    const handleDeleteType = async (id) => {
        // Check if any news item uses this news type
        const usedByNews = newsData.some(news => news.newsTypeName === newsTypeData.find(type => type.id === id).newsTypeName);
        console.log("Cannot delete. News type is in use.");
        if (usedByNews) {
            return;
        }
    
        try {
            await dispatch(deleteNewsType(id));
        } catch (error) {
            console.error("Error deleting news type:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const indexOfLastContact = currentPage * contactsPerPage;
    const indexOfFirstContact = indexOfLastContact - contactsPerPage;

    let filteredNews = newsData.filter((news) => {
        const searchTermLowerCase = searchTerm.toLowerCase();
        return (
            news.title.toLowerCase().includes(searchTermLowerCase) ||
            news.content.toLowerCase().includes(searchTermLowerCase) ||
            news.newsTypeName.toLowerCase().includes(searchTermLowerCase)
        );
    });

    const currentNews = filteredNews.slice(indexOfFirstContact, indexOfLastContact);
    const pageNumbers = Math.ceil(filteredNews.length / contactsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.container}>
            <h2>News Data Management</h2>

            <div className="row mb-3">
                <div className="col-sm-9">
                    <label htmlFor="searchTerm" className="form-label">
                        Search Title/Content:
                    </label>
                    <input
                        type="text"
                        id="searchTerm"
                        className="form-control"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        placeholder="Type to search..."
                    />
                </div>
                <div className="col-sm-3">
                    <h2>News Type</h2>
                    <button
                        type="button"
                        className={`btn btn-info btn-lg ${styles['btn-primary']}`}
                        onClick={() => setShowTypeModal(true)}
                    >
                        Create News Type
                    </button>
                </div>
            </div>

            <button
                className={`btn btn-success mb-3 ${styles['btn-primary']}`}
                onClick={() => navigate("/newsadmin/create-news")}
            >
                Create News <IoNewspaperOutline />
            </button>

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Content</th>
                        <th>NewsTypeName</th>
                        <th>Image</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {currentNews.map((news) => (
                        <tr key={news.id}>
                            <td>{news.id}</td>
                            <td>{news.title}</td>
                            <td>{truncateText(news.content)}</td>
                            <td>{news.newsTypeName}</td>
                            <td>
                                {news.imagePaths && news.imagePaths.length > 0 && (
                                    <img
                                        src={news.imagePaths[0]}
                                        alt={`News ${news.id}`}
                                        className="img-fluid"
                                    />
                                )}
                            </td>
                            <td>
                                <button
                                    className="btn btn-outline-primary"
                                    onClick={() => {
                                        setSelectedNews(news);
                                        setShowDetailModal(true);
                                    }}
                                >
                                    <BsInfoCircle />
                                </button>
                                <button
                                    className="btn btn-outline-warning"
                                    onClick={() => handleEdit(news.id)}
                                >
                                    <HiOutlinePencilSquare />
                                </button>
                                <button
                                    className="btn btn-outline-danger"
                                    onClick={() => handleDelete(news.id)}
                                >
                                    <FaRegTrashAlt />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for News Details */}
            {showDetailModal && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal-dialog']}>
                        <div className={styles['modal-content']}>
                            <div className={styles['modal-header']}>
                                <h4 className={styles['modal-title']}>
                                    News Title: {selectedNews && selectedNews.title}
                                </h4>
                                <button
                                    type="button"
                                    className={`btn-close ${styles['btn-close']}`}
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className={styles['modal-body']}>
                                {selectedNews && (
                                    <div>
                                        <h5>News Content:</h5>
                                        <p>{selectedNews.content}</p>
                                        <h5>News Image(s):</h5>
                                        {selectedNews.imagePaths && selectedNews.imagePaths.length > 0 ? (
                                            selectedNews.imagePaths.map((imagePath, index) => (
                                                <img
                                                    key={index}
                                                    src={imagePath}
                                                    alt={`News ${selectedNews.id}`}
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
                                    className={`btn btn-danger ${styles['btn-danger']}`}
                                    onClick={() => setShowDetailModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Create News Type */}
            {showTypeModal && (
                <div className={styles['modal-overlay']}>
                    <div className={styles['modal-dialog']}>
                        <div className={styles['modal-content']}>
                            <div className={styles['modal-header']}>
                                <h4 className={styles['modal-title']}>Type of News</h4>
                                <button
                                    type="button"
                                    className={`btn-close ${styles['btn-close']}`}
                                    onClick={() => setShowTypeModal(false)}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className={styles['modal-body']}>
                                <table className={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>News Type Name</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    {newsTypeData.map((type) => (
                                            <tr key={type.id}>
                                                <td>{type.newsTypeName}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-outline-warning"
                                                        onClick={() => {
                                                            const newName = prompt("Enter new name", type.newsTypeName);
                                                            if (newName) {
                                                                handleEditType(type.id, newName);
                                                            }
                                                        }}
                                                    >
                                                        <HiOutlinePencilSquare />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => handleDeleteType(type.id)}
                                                        disabled={newsData.some(news => news.newsTypeName === type.newsTypeName)}
                                                    >
                                                        <FaRegTrashAlt />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="form-group">
                                    <label htmlFor="addNewsTypeName">Add News Type Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="addNewsTypeName"
                                        value={addNewsTypeName}
                                        onChange={(e) => setAddNewsTypeName(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className={`btn btn-primary ${styles['btn-primary']}`}
                                    onClick={handleAddNewsType}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add Type'}
                                </button>
                            </div>
                            <div className={styles['modal-footer']}>
                                <button
                                    type="button"
                                    className={`btn btn-secondary ${styles['btn-outline-secondary']}`}
                                    onClick={() => setShowTypeModal(false)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            <nav>
                <ul className={`pagination ${styles.pagination}`}>
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                        <button className="page-link" onClick={() => paginate(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {Array.from({ length: pageNumbers }, (_, index) => (
                        <li
                            key={index}
                            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
                        >
                            <button
                                className="page-link"
                                onClick={() => paginate(index + 1)}
                            >
                                {index + 1}
                            </button>
                        </li>
                    ))}
                    <li
                        className={`page-item ${currentPage === pageNumbers ? "disabled" : ""}`}
                    >
                        <button
                            className="page-link"
                            onClick={() => paginate(currentPage + 1)}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NewsAd;

function truncateText(text) {
    const words = text.split(' ');
    if (words.length > 10) {
        return words.slice(0, 10).join(' ') + '...';
    } else {
        return text;
    }
}

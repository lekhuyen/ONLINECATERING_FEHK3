import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { fetchNewsData, deleteNewsItem } from "../../redux/Information/newsSlice";
import { fetchNewsTypes, editNewsType, deleteNewsType, createNewsType } from "../../redux/Information/newsTypeSlice";

function NewsAd() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Selecting state from Redux store
    const newsData = useSelector((state) => state.news.items);
    const newsTypeData = useSelector((state) => state.newsTypes.items);
    const status = useSelector((state) => state.news.status);
    const error = useSelector((state) => state.news.error);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const contactsPerPage = 5; // Number of items per page

    // State for search and date filters
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedNews, setSelectedNews] = useState(null);
    const [addNewsTypeName, setAddNewsTypeName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

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
            // Assuming the response returns updated data, you may dispatch an action
            // to update your Redux store if needed.
            dispatch(editNewsType(updatedType)); // Assuming you have an action like this in your redux
            // Or you can re-fetch the types after successful update
            dispatch(fetchNewsTypes());
        } else {
            console.error('Failed to edit News Type:', response.statusText);
        }
      } catch (error) {
          console.error('Error editing News Type:', error);
      }
  };


    const handleDeleteType = async (id) => {
        try {
            await dispatch(deleteNewsType(id));
        } catch (error) {
            console.error("Error deleting news type:", error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Pagination logic and filtered newsData
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

    // Handling initial loading state and fetch error state
    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="container">
            <h2>News Data</h2>

            <div className="row mb-3">
                <div className="col-sm-12">
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
            </div>

            <button
                className="btn btn-success mb-3"
                onClick={() => navigate("/newsadmin/create-news")}
            >
                Create News <IoNewspaperOutline />
            </button>

            <table className="table table-hover">
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
                            <td>{news.content}</td>
                            <td>{news.newsTypeName}</td>
                            <td>
                                {news.imagePaths && news.imagePaths.length > 0 && (
                                    <img
                                        src={`http://localhost:5034${news.imagePaths[0]}`}
                                        alt={`News ${news.id}`}
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
                                    onClick={() => setSelectedNews(news)}
                                    data-toggle="modal"
                                    data-target="#myModal"
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
            <div className="modal fade" id="myModal" role="dialog">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h4 className="modal-title float-start">
                                News Title: {selectedNews && selectedNews.title}
                            </h4>
                            <button
                                type="button"
                                className="btn btn-danger float-end"
                                data-dismiss="modal"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {selectedNews && (
                                <div>
                                    <h5>News Content:</h5>
                                    <p>{selectedNews.content}</p>
                                    <h5>News Image(s):</h5>
                                    {selectedNews.imagePaths && selectedNews.imagePaths.length > 0 ? (
                                        selectedNews.imagePaths.map((imagePath, index) => (
                                            <img
                                                key={index}
                                                src={`http://localhost:5034${imagePath}`}
                                                alt={`News ${selectedNews.id}`}
                                                style={{
                                                    width: "20%",
                                                    height: "auto",
                                                    marginBottom: "10px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                        ))
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
                                data-dismiss="modal"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Create News Type */}
            <div className="container">
                <h2>News Type</h2>
                <button
                    type="button"
                    className="btn btn-info btn-lg"
                    data-bs-toggle="modal"
                    data-bs-target="#TypeModal"
                >
                    Create News Type
                </button>

                <div className="modal fade" id="TypeModal" role="dialog">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Type of News</h4>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <table className="table">
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
                                                        onClick={() =>
                                                            handleEditType(
                                                                type.id,
                                                                prompt("Enter new name")
                                                            )
                                                        }
                                                    >
                                                        <HiOutlinePencilSquare />
                                                    </button>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() =>
                                                            handleDeleteType(type.id)
                                                        }
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
                                    className="btn btn-primary"
                                    onClick={handleAddNewsType}
                                    disabled={isSubmitting}
                                >
                                    Add Type
                                </button>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            <nav>
                <ul className="pagination">
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
                        className={`page-item ${
                            currentPage === pageNumbers ? "disabled" : ""
                        }`}
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

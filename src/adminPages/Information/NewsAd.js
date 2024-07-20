import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  deleteNewsItem,
  fetchNewsData,
} from "../../redux/Information/newsSlice";
import "@fortawesome/fontawesome-free/css/all.css"; // Import Font Awesome CSS

function NewsAd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selecting state from Redux store
  const newsData = useSelector((state) => state.news.items);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 5; // Number of items per page

  // State to track selected news item for modal display
  const [selectedNews, setSelectedNews] = useState(null);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5034/api/News/${id}`);
      dispatch(deleteNewsItem(id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/News-edit/${id}`);
  };

  // Pagination logic
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentNews = newsData.slice(indexOfFirstContact, indexOfLastContact);

  // Calculate total pages for pagination
  const pageNumbers = Math.ceil(newsData.length / contactsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handling initial loading state
  if (status === "loading") {
    return <div>Loading...</div>;
  }

  // Handling fetch error state
  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  // Ensure newsData is always an array before mapping over it
  if (!Array.isArray(newsData)) {
    return null; // or handle the case where newsData is not an array
  }

  // Function to limit content to at least 9 words with ellipses
  const limitContent = (content) => {
    const words = content.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return content;
  };

  // Function to handle click on the info icon
  const handleInfoClick = (news) => {
    setSelectedNews(news);
    // You can also trigger modal open programmatically here if needed
  };

  return (
    <div className="container">
      <h2>News Data</h2>
      <button
        className="btn btn-success mb-3"
        onClick={() => navigate("/Create-News")}
      >
        Create News
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
              <td>{limitContent(news.content)}</td>
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
                  onClick={() => handleInfoClick(news)}
                  data-toggle="modal"
                  data-target="#myModal"
                >
                  <i className="fa fa-info-circle" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-outline-warning"
                  onClick={() => handleEdit(news.id)}
                >
                  <i className="fa fa-pencil-square" aria-hidden="true"></i>
                </button>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(news.id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <div className="modal fade" id="myModal" role="dialog">
        <div className="modal-dialog modal-lg">
          {/* Modal content */}
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
                  {selectedNews.imagePaths &&
                  selectedNews.imagePaths.length > 0 ? (
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

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => paginate(currentPage - 1)}
            >
              Previous
            </button>
          </li>
          {Array.from({ length: pageNumbers }, (_, index) => (
            <li
              key={index}
              className={`page-item ${
                currentPage === index + 1 ? "active" : ""
              }`}
            >
              <button className="page-link" onClick={() => paginate(index + 1)}>
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

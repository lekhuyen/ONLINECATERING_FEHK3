import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { deleteNewsItem, fetchNewsData } from '../../redux/Information/newsSlice';

function NewsAd() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selecting state from Redux store
  const newsData = useSelector((state) => state.news.items);
  const status = useSelector((state) => state.news.status);
  const error = useSelector((state) => state.news.error);

  useEffect(() => {
    dispatch(fetchNewsData());
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5034/api/News/${id}`);
      dispatch(deleteNewsItem(id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleEdit = (id) => {
    navigate(`/News-edit/${id}`);
  };

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

  return (
    <div className='container'>
      <h2>News Data</h2>
      <button className="btn btn-success mb-3" onClick={() => navigate('/Create-News')}>Create News</button>

      <table className="table table-dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Content</th>
            <th>NewsTypeId</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {newsData.map((news) => (
            <tr key={news.id}>
              <td>{news.id}</td>
              <td>{news.title}</td>
              <td>{news.content}</td>
              <td>{news.newsTypeId}</td>
              <td>
                {news.imagePaths && news.imagePaths.map((image, index) => (
                  <img
                    key={index}
                    src={`http://localhost:5034${image}`}
                    alt={`News ${index}`}
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                ))}
              </td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleEdit(news.id)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger ml-2"
                  onClick={() => handleDelete(news.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default NewsAd;

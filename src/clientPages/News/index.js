import React, { useEffect } from 'react';
import { fetchNewsData } from '../../redux/Information/newsSlice';
import { useDispatch, useSelector } from 'react-redux';

const News = () => {

    const dispatch = useDispatch();

    // Selecting state from Redux store
    const newsData = useSelector((state) => state.news.items);
    const status = useSelector((state) => state.news.status);
    const error = useSelector((state) => state.news.error);

    useEffect(() => {
        dispatch(fetchNewsData());
    }, [dispatch]);

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
        <div className="container mt-5">
        <h2>News</h2>

        <div className="row">
            {newsData.map((news) => (
                <div className="col-md-4 mb-3" key={news.id}>
                    <div className="card" style={{ maxWidth: '400px' }}>
                        <div className="card-body">
                            <h4 className="card-title">{news.title}</h4>
                            <p className="card-text">{news.content}</p>
                            <div className="row">
                                {news.imagePaths && news.imagePaths.map((image, index) => (
                                    <div className="col-md-4" key={index}>
                                        <img
                                            src={`http://localhost:5034${image}`}
                                            alt={`News ${index}`}
                                            className="img-fluid"
                                            style={{ marginBottom: '10px' }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );
};

export default News;
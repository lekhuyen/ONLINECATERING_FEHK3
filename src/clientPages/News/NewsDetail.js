import React, { useEffect } from 'react';
import { fetchNewsData } from '../../redux/Information/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import styles from './News.module.scss';
import clsx from 'clsx';

const News = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize navigate

    // Selecting state from Redux store
    const newsData = useSelector((state) => state.news.items);
    const status = useSelector((state) => state.news.status);
    const error = useSelector((state) => state.news.error);

    useEffect(() => {
        dispatch(fetchNewsData());
    }, [dispatch]);

    // Handling initial loading state
    if (status === 'loading') {
        return <div className={clsx(styles.loading)}>Loading...</div>;
    }

    // Handling fetch error state
    if (status === 'failed') {
        return <div className={clsx(styles.error)}>Error: {error}</div>;
    }

    // Ensure newsData is always an array before mapping over it
    if (!Array.isArray(newsData)) {
        return null; // or handle the case where newsData is not an array
    }

    const truncateWords = (text, limit) => {
        const words = text.split(' ');
        if (words.length > limit) {
            return words.slice(0, limit).join(' ') + '...';
        }
        return text;
    };

    const handleLearnMore = (id) => {
        navigate(`/news/${id}`); // Navigate to NewsDetail page
    };

    return (
        <div className={clsx(styles.news_container, 'app__bg')}>
            <div className={clsx(styles.news_header_title)}>
                <h1>News & Blog</h1>
            </div>
            <div className={clsx(styles.news_row)}>
                {newsData.map((news) => (
                    <div className={clsx(styles.news_card)} key={news.id}>
                        {news.imagePaths && news.imagePaths.length > 0 && (
                            <img
                                src={news.imagePaths[0]} // Assuming you want to display only the first image
                                alt={`News ${news.id}`}
                                className={clsx(styles.news_image)}
                            />
                        )}
                        <div className={clsx(styles.news_content)}>
                            <h4 className={clsx(styles.news_title)}>{news.title}</h4>
                            <p className={clsx(styles.news_text)}>
                                {truncateWords(news.content, 10)}
                                {news.content.split(' ').length > 10 && (
                                    <span>
                                        {' '}
                                        <button
                                            className={clsx(styles.learn_more_btn)}
                                            onClick={() => handleLearnMore(news.id)}
                                        >
                                            Learn More
                                        </button>
                                    </span>
                                )}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default News;

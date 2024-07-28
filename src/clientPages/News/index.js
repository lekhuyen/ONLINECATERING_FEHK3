import React, { useEffect } from 'react';
import { fetchNewsData } from '../../redux/Information/newsSlice';
import { useDispatch, useSelector } from 'react-redux';
import styles from './News.module.scss';
import clsx from 'clsx';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

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
    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    // Handling fetch error state
    if (status === 'failed') {
        return <div>Error: {error}</div>;
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

    return (
        <div className={clsx(styles.news_container, 'app__bg')}>
            <div className={cx('news_header_title')}>
                <h1>News & Blog</h1>
            </div>
            <div className={cx('news_row')}>
                <div className="container pt-5 mt-5">
                    <div className="container-fluid">
                        <div className="row">
                            {newsData.map((news) => (
                                <div className="col-md-4 mb-3" key={news.id}>
                                    <div className="card border-light h-100">
                                        <div >
                                            {news.imagePaths && news.imagePaths.length > 0 && (
                                                <img
                                                    src={news.imagePaths[0]} // Assuming you want to display only the first image
                                                    alt={`News ${news.id}`}
                                                    style={{
                                                        width: '100%',
                                                        height: 'auto',
                                                        objectFit: 'cover',
                                                    }}
                                                />
                                            )}
                                            <h4 className="card-title text-center">{news.title}</h4>
                                            <p className="card-text">
                                                {truncateWords(news.content, 10)}
                                                {news.content.split(' ').length > 10 && (
                                                    <span>
                                                        {' '}
                                                        <button className="btn btn-link">Learn More</button>
                                                    </span>
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { fetchNewsData } from "../../redux/Information/newsSlice";
import { RiArrowGoBackLine } from "react-icons/ri";
import styles from "./NewsDetail.module.scss";
import clsx from "clsx";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export default function NewsDetail() {
  const { id } = useParams(); // Get news ID from route params
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.news.items);
  const [newsItem, setNewsItem] = useState(null);

  useEffect(() => {
    dispatch(fetchNewsData()); // Fetch all news data
  }, [dispatch]);

  useEffect(() => {
    // Find the news item with the given ID
    const item = newsData.find((news) => news.id === id);
    setNewsItem(item);
  }, [newsData, id]);

  const handleGoBack = () => {
    navigate('/news'); // Go back to the previous page
  };

  const handleNext = () => {
    const currentIndex = newsData.findIndex((news) => news.id === id);
    const nextIndex = (currentIndex + 1) % newsData.length; // Wrap around if at the end
    navigate(`/news/${newsData[nextIndex].id}`);
  };

  const handlePrevious = () => {
    const currentIndex = newsData.findIndex((news) => news.id === id);
    const prevIndex = (currentIndex - 1 + newsData.length) % newsData.length; // Wrap around if at the start
    navigate(`/news/${newsData[prevIndex].id}`);
  };

  if (!newsItem) {
    return <div className={styles.loading}>Loading...</div>; // Display loading message while fetching
  }

  return (
    <div className={clsx(styles.news_container, "app__bg")}>
      <div className="mt-3">
        <button className="btn btn-secondary" onClick={handleGoBack}>
          <RiArrowGoBackLine /> Go Back
        </button>
      </div>
      <div className={cx("news_detail_container")}>
        <h1 className={cx("news_detail_title")}>{newsItem.title}</h1>
        <div className={cx("news_image_container")}>
          {newsItem.imagePaths && newsItem.imagePaths.length > 0 && (
            <img
              src={newsItem.imagePaths[0]} // Assuming you want to display only the first image
              alt={`News ${newsItem.id}`}
              className={cx("news_image")}
            />
          )}
        </div>
        <div className={cx("news_detail_text")}>{newsItem.content}</div>
        <div className={cx("news_detail_controls")}>
          <button
            className={cx("news_detail_control_button")}
            onClick={handlePrevious}
          >
            {"<---- Previous"}
          </button>
          <button
            className={cx("news_detail_control_button")}
            onClick={handleNext}
          >
            {"Next --->"}
          </button>
        </div>
      </div>
    </div>
  );
}
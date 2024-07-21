// src/clientPages/AboutUs/About.js
import React, { useEffect } from 'react';
import styles from './About.module.scss'
import clsx from 'clsx';
import classNames from "classnames/bind";
import { useSelector, useDispatch } from 'react-redux';
import { fetchAboutData } from '../../redux/Information/aboutSlice';
// import './About.css'; // Import the CSS file
import { images } from "../../constants";

const cx = classNames.bind(styles)

const About = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAboutData());
    }, [dispatch]);

    const aboutData = useSelector((state) => state.about.items);
    const status = useSelector((state) => state.about.status);
    const error = useSelector((state) => state.about.error);

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    if (status === "failed") {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={clsx(styles.aboutUs_container, "app__bg")}>
            <div className={cx("aboutUs_header_title")}><h1>Welcome to OnlineCatering.in</h1></div>
            <div className={cx("aboutUs_row")}>
                <div className="about_us container-fluid mt-5">
                    {/* About Us Section */}
                    <div className=' mb-4'>
                        <h4 className={cx("aboutUs_title")}>About Us</h4>
                        {aboutData.map((about) => {
                            if (about.aboutTypeName === 'ABOUT US') {
                                return (
                                    <div className="about_us_card card" key={about.id}>
                                        <div className="about_us_card_body">
                                            <h1 className="about_us_card_title card-title">{about.title}</h1>
                                            <p className="about_us_card_text card-text">{about.content}</p>
                                            <div className="about_us_row row justify-content-center">
                                                {about.imagePaths && about.imagePaths.slice(0, 3).map((image, index) => (
                                                    <div className="about_us_image_col col-md-4" key={index}>
                                                        <img
                                                            src={`http://localhost:5034${image}`}
                                                            alt={`About ${index}`}
                                                            className="about_us_image img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <br />
                    {/* OUR HISTORY Section */}
                    <div className='mb-4'>
                        <h4 className={cx("aboutUs_title")}>Our Story</h4>
                        {aboutData.map((about) => {
                            if (about.aboutTypeName === 'OUR HISTORY') {
                                return (
                                    <div className="about_us_card card" key={about.id}>
                                        <div className="about_us_card_body">
                                            <h1 className="about_us_card_title card-title">{about.title}</h1>
                                            <p className="about_us_card_text card-text">{about.content}</p>
                                            <div className="about_us_row row justify-content-center">
                                                {about.imagePaths && about.imagePaths.slice(0, 3).map((image, index) => (
                                                    <div className="about_us_image_col col-md-4" key={index}>
                                                        <img
                                                            src={`http://localhost:5034${image}`}
                                                            alt={`About ${index}`}
                                                            className="about_us_image img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>
                    <br />
                    {/* NEWS & BLOGS Section */}
                    <div className='mb-4'>
                        <h4 className={cx("aboutUs_title")}>Our Blog</h4>
                        {aboutData.map((about) => {
                            if (about.aboutTypeName === 'NEWS & BLOGS') {
                                return (
                                    <div className="about_us_card card" key={about.id}>
                                        <div className="about_us_card_body">
                                            <h1 className="about_us_card_title card-title">{about.title}</h1>
                                            <p className="about_us_card_text card-text">{about.content}</p>
                                            <div className="about_us_row row justify-content-center">
                                                {about.imagePaths && about.imagePaths.slice(0, 3).map((image, index) => (
                                                    <div className="about_us_image_col col-md-4" key={index}>
                                                        <img
                                                            src={`http://localhost:5034${image}`}
                                                            alt={`About ${index}`}
                                                            className="about_us_image img-fluid"
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Add more sections as needed */}
                </div>
            </div>
        </div>
    );
};

export default About;

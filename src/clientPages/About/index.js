// src/clientPages/AboutUs/About.js
import React, { useEffect } from 'react';
import styles from './About.module.scss';
import clsx from 'clsx';
import classNames from 'classnames/bind';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAboutData } from '../../redux/Information/aboutSlice';
import { fetchAboutTypes } from '../../redux/Information/aboutTypeSlice';
import { images } from '../../constants';

const cx = classNames.bind(styles);

const AboutSection = ({  aboutData, aboutTypeName }) => {
    return (
        <div className=''>

            {aboutData.map((about) => {
                if (about.aboutTypeName === aboutTypeName) {
                    return (
                        <div className="about_us_card card" key={about.id}>
                            <div className="about_us_card_body">
                                <h1 className="about_us_card_title card-title">{about.title}</h1>
                                <p className="about_us_card_text card-text">{about.content}</p>
                                <div className="about_us_row row justify-content-center">
                                    {about.imagePaths && about.imagePaths.slice(0, 3).map(( index) => (
                                        <div className="about_us_image_col col-md-4" key={index}>
                                            <img
                                                src={about.imagePaths}
                                                alt={`about ${about.id}`}
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
    );
};

AboutSection.propTypes = {
    sectionTitle: PropTypes.string.isRequired,
    aboutData: PropTypes.array.isRequired,
    aboutTypeName: PropTypes.string.isRequired,
};

const About = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAboutData());
        dispatch(fetchAboutTypes());
    }, [dispatch]);

    const aboutData = useSelector((state) => state.about.items);
    const aboutTypes = useSelector((state) => state.aboutTypes.items);
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
                    {aboutTypes.map((type) => (
                        <AboutSection
                            key={type.id}
                            sectionTitle={type.aboutTypeName.replace(/_/g, ' ')}
                            aboutData={aboutData}
                            aboutTypeName={type.aboutTypeName}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default About;

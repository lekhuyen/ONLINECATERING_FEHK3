import React, { useEffect } from 'react';
import styles from './About.module.scss';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAboutData } from '../../redux/Information/aboutSlice';
import { fetchAboutTypes } from '../../redux/Information/aboutTypeSlice';

const About = () => {
    const AboutSection = ({ aboutData, aboutTypeName }) => {
        return (
            <div className={styles.aboutSection}>
                {aboutData.map((about, index) => {
                    if (about.aboutTypeName === aboutTypeName) {
                        const isEven = index % 2 === 0;
                        const imagePath = about.imagePaths && about.imagePaths.length > 0 ? about.imagePaths[0] : null;

                        return (
                            <div className={clsx(styles.aboutCard, isEven ? styles.even : styles.odd)} key={about.id}>
                                <div className={clsx(styles.imageContainer, isEven ? styles.left : styles.right)}>
                                    {imagePath && (
                                        <img
                                            src={imagePath}
                                            alt={`about ${about.id}`}
                                            className={styles.aboutImage}
                                        />
                                    )}
                                </div>
                                <div className={clsx(styles.textContainer, isEven ? styles.right : styles.left)}>
                                    <h1 className={styles.aboutTitle}>{about.title}</h1>
                                    <p className={styles.aboutText}>{about.content}</p>
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

    // Render the About component
    return (
        <div className={clsx(styles.aboutUsContainer, "app__bg")}>
            <div className={styles.aboutUsHeaderTitle}><h1>Welcome to OnlineCatering.in</h1></div>
            <div className={styles.aboutUsRow}>
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

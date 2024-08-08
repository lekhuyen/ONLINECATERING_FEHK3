import React from 'react';
import { images } from '../../constants';
import './AboutUs.css';
import { useNavigate } from 'react-router-dom';

const AboutUs = () => {
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleKnowMoreClick = () => {
        navigate('/about'); // Navigate to "/about" when button is clicked
    };

    return (
        <div className="app__aboutus app__bg flex__center section__padding" id="about">
            {/* <div className="app__aboutus-overlay flex__center">
                <img src={images.G} alt="G_overlay" />
            </div> */}

            <div className="app__aboutus-content flex__center">
                <div className="app__aboutus-content_about">
                    <h1 className="headtext__cormorant">About Us</h1>
                    <img src={images.spoon} alt="about_spoon" className="spoon__img" />
                    <p className="p__opensans">
                    Online Catering revolutionizes catering services by offering an online platform available in select cities. 
                    It provides a simple, convenient, and comprehensive solution for all catering needs through the website 'onlinecatering.in'
                    </p>
                    <button type="button" className="custom__button" onClick={handleKnowMoreClick}>
                        Know More
                    </button>
                </div>

                <div className="app__aboutus-content_knife flex__center">
                    <img src={images.dessert1} alt="about_dessert1" />
                </div>

                <div className="app__aboutus-content_history">
                    <h1 className="headtext__cormorant">Our History</h1>
                    <img src={images.spoon} alt="about_spoon" className="spoon__img" />
                    <p className="p__opensans">
                    Our history unfolds a rich tapestry of milestones, reflecting our journey through time. 
                    From humble beginnings to significant achievements, we've carved a legacy of excellence and innovation in the catering industry
                    </p>
                    <button type="button" className="custom__button" onClick={handleKnowMoreClick}>
                        Know More
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;

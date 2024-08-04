import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import SubHeading from "../../components/Layout/DefaultLayout/SubHeading/Index.js";
import { images } from "../../constants/index.js";
import "./Home.css";
import AboutUs from "../AboutUs/Index.js";
import SpecialMenu from "../SpecialMenu/index.js";
import Chef from "../Chef/index.js";
import Intro from "../Intro/index.js";
import Laurels from "../Laurels/index.js";
import Gallery from "../Gallery/index.js";
import FindUs from "../FindUs/index.js";
import FooterOverlay from "../Footer/FooterOverlay.js";
import Newsletter from "../Footer/Newsletter.js";

const Home = () => {
    const navigate = useNavigate();  // Initialize useNavigate hook

    const handleExploreMenuClick = () => {
        navigate("/menu");  // Navigate to "/menu" when button is clicked
    };

    return (
        <div>
            <div className="app__header app__wrapper section__padding" id="home">
                <div className="app__wrapper_info">
                    <SubHeading title="Chase the new flavour" />
                    <h1 className="app__header-h1">The Key To Fine Dining</h1>
                    <p className="p__opensans" style={{ margin: "2rem 0" }}>
                        Online Catering is a revolutionary service offering online catering solutions across several cities.
                        It aims to simplify and streamline all catering needs through a single platform, onlinecatering.in. 
                        The goal is to bring together caterers under one roof, providing convenience for everyone. 
                        Planning special occasions such as birthdays, weddings, anniversaries, corporate events, or college gatherings like freshers' parties and farewell events can be quite daunting.
                    </p>
                    <button type="button" className="custom__button" onClick={handleExploreMenuClick}>
                        Explore Menu
                    </button>
                </div>
                <div className="app__wrapper_img">
                    <img src={images.welcome} alt="header_img" />
                </div>
            </div>
            <AboutUs />
            <SpecialMenu />
            <Chef />
            <Intro />
            <Laurels />
            <Gallery />
            <FindUs />
            <FooterOverlay />
            <Newsletter />
        </div>
    );
};

export default Home;

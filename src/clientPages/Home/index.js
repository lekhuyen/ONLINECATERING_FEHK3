import React from "react";

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
// import FooterOverlay from '../'

const Home = () => (
    <div>
        <div className="app__header app__wrapper section__padding" id="home">
            <div className="app__wrapper_info">
                <SubHeading title="Chase the new flavour" />
                <h1 className="app__header-h1">The Key To Fine Dining</h1>
                <p className="p__opensans" style={{ margin: "2rem 0" }}>
                    Sit tellus lobortis sed senectus vivamus molestie. Condimentum volutpat
                    morbi facilisis quam scelerisque sapien. Et, penatibus aliquam amet
                    tellus{" "}
                </p>
                <button type="button" className="custom__button">
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

export default Home;

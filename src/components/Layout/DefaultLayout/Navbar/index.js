import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../../../constants/images";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [toggleMenu, setToggleMenu] = React.useState(false);
    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.gericht} alt="app__logo" />
            </div>
            <ul className="app__navbar-links">
                <li className="p__opensans">
                    <Link to="/">Home</Link>
                </li>
                <li className="p__opensans">
                    <Link to="/about">About</Link>
                </li>
                <li className="p__opensans">
                    <Link to="/menu">Menu</Link>
                </li>
                <li className="p__opensans">
                    <a href="#awards">Awards</a>
                </li>
                <li className="p__opensans">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            <div className="app__navbar-login">
                <Link to="/login" className="p__opensans">
                    Log In / Registration
                </Link>
                <div />
                <Link to="/order" className="p__opensans">
                    Book Table
                </Link>
            </div>
            <div className="app__navbar-smallscreen">
                <GiHamburgerMenu
                    color="#fff"
                    fontSize={27}
                    onClick={() => setToggleMenu(true)}
                />
                {toggleMenu && (
                    <div className="app__navbar-smallscreen_overlay flex__center slide-bottom">
                        <MdOutlineRestaurantMenu
                            fontSize={27}
                            className="overlay__close"
                            onClick={() => setToggleMenu(false)}
                        />
                        <ul className="app__navbar-smallscreen_links">
                            <li>
                                <a href="#home" onClick={() => setToggleMenu(false)}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" onClick={() => setToggleMenu(false)}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#menu" onClick={() => setToggleMenu(false)}>
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a href="#awards" onClick={() => setToggleMenu(false)}>
                                    Awards
                                </a>
                            </li>
                            <li>
                                <a href="#contact" onClick={() => setToggleMenu(false)}>
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

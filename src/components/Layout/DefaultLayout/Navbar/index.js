import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../../../constants/images";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/User/userSlice";

const Navbar = () => {
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = React.useState(false);
    const { isLoggedIn } = useSelector(state => state.user)
    const [userCurrent, setUserCurrent] = useState('')
    const [showLoginBtn, setShowLoginBtn] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user.userName);
        }
    }, [isLoggedIn])
    const handleOnclickAccount = () => {
        navigate("/user")
    }
    
    const handleClickLogout = () => {
        dispatch(logout())
        localStorage.removeItem("userCurrent")
        navigate("/")
    }

    return (
        <nav className="app__navbar">
            <div className="app__navbar-logo">
                <img src={images.oclogo} alt="app__logo" />
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
                    <Link to="/news">News & Blog</Link>
                </li>
                <li className="p__opensans">
                    <Link to="/contact">Contact</Link>
                </li>
            </ul>
            <div className="app__navbar-login">
                {
                    !isLoggedIn ? (
                        <Link to="/login" className="p__opensans">
                            Login/Register
                        </Link>
                    )
                        :
                        <div
                            className="user__name"
                            onMouseOver={() => setShowLoginBtn(true)}
                            onMouseLeave={() => setShowLoginBtn(false)}
                        >
                            <p>
                                {userCurrent}
                            </p>
                            
                            {
                                showLoginBtn && (
                                    <div className="btn__login">
                                        <span
                                            onClick={handleOnclickAccount}
                                            className="acount-info">
                                            <span>Account</span>
                                        </span>
                                        <div>
                                            <span
                                            onClick={handleClickLogout}
                                            >Logout</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                }
                <div />
                <Link to="/order" className="p__opensans">
                    Reservation
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
                                <a href="/" onClick={() => setToggleMenu(false)}>
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" onClick={() => setToggleMenu(false)}>
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="/menu" onClick={() => setToggleMenu(false)}>
                                    Menu
                                </a>
                            </li>
                            <li>
                                <a href="#awards" onClick={() => setToggleMenu(false)}>
                                    Awards
                                </a>
                            </li>
                            <li>
                                <a href="/contact" onClick={() => setToggleMenu(false)}>
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

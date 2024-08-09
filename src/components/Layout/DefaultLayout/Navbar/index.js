import React, { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import images from "../../../../constants/images";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, showNotification } from "../../../../redux/User/userSlice";
import { IoIosNotifications, IoMdCart } from "react-icons/io";
import Notification from "../../../../clientPages/Notification";

const Navbar = () => {
    const navigate = useNavigate()
    const [toggleMenu, setToggleMenu] = React.useState(false);
    const { isLoggedIn, orderStatus,showNotifiStatus,showChatForm } = useSelector(state => state.user)
    const [userCurrent, setUserCurrent] = useState('')
    const [showLoginBtn, setShowLoginBtn] = useState(false)
    const dispatch = useDispatch()
    const { messageChat } = useSelector(state => state.user);
    const [messNotifi, setMessNotifi] = useState([]);
    useEffect(() => {
        if (messageChat) {
            const result = processMessages(messageChat);
            setMessNotifi(result);
        }
    }, [messageChat]);

    const processMessages = (messages) => {
        const grouped = messages.reduce((acc, message) => {
            if (!acc[message.roomCode]) {
                acc[message.roomCode] = [];
            }
            acc[message.roomCode].push(message);
            return acc;
        }, {});

        const lastMessagesPerRoom = Object.values(grouped).map(group => group[group.length - 1]);

        const otherMessages = messages.filter(message => !lastMessagesPerRoom.some(lastMsg => lastMsg.roomCode === message.roomCode));

        return [...lastMessagesPerRoom, ...otherMessages];
    };

    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user?.userName);
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
    const hanldeShowNotitfi = () => {
        dispatch(showNotification({statusNotifi:!showNotifiStatus}))
        // setShowNotifiStatus(prev =>(!prev))
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
                    <Link to="/lobby">Lobby</Link>
                </li>

                <li className="p__opensans">
                    <Link to="/ordercombo">Combo</Link>
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
                <div className="p__opensans" style={{position: 'relative'}}>
                    <div 
                        onClick={hanldeShowNotitfi}
                        className="p__icon_notifi"><IoIosNotifications size={25}/>
                        {
                            messNotifi.length > 0 
                            ? 
                            <div className="p__notifi_count">{messNotifi.length}</div>
                            :
                            ""
                        }
                    </div>
                    {
                        showNotifiStatus && 
                        <div><Notification/></div>
                    }
                </div>

                <div onClick={() => navigate('/order')} className="p__carticon">
                    {
                        orderStatus &&
                        <div className="p__opensans">
                            <IoMdCart size={25} />
                        </div>
                    }

                </div>
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
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/menu" onClick={() => setToggleMenu(false)}>
                                    Our Menu
                                </a>
                            </li>

                            <li>
                                <a href="/news" onClick={() => setToggleMenu(false)}>
                                    Our Blog
                                </a>
                            </li>
                            <li>
                                <a href="/contact" onClick={() => setToggleMenu(false)}>
                                    Get In Touch
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

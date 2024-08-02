import React, { useEffect, useState } from 'react';
import styles from './User.module.scss'
import classNames from 'classnames/bind';
import clsx from 'clsx'
import { menuUserTab } from '../../ultil/menu';
import ChangePassword from '../ChangePassword';
import HistoryBooking from '../BookingHistory';
import { IoIosLogOut } from 'react-icons/io';
import FavoriteList from '../FavoriteList';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/User/userSlice';

const cx = classNames.bind(styles)
const User = () => {
    const [statusUserTab, setClickUserTab] = useState(2)
    const { isLoggedIn } = useSelector(state => state.user)
    const [userCurrent, setUserCurrent] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            if (user) {
                setUserCurrent(user);
            }
        }
    }, [isLoggedIn])
    const handleClickUserTab = (id) => {
        setClickUserTab(id)
    }
    const handleClickLogout = () => {
        dispatch(logout())
        localStorage.removeItem("userCurrent")
        navigate("/")
    }
    return (
        <div className={clsx(styles.user_container, "app__bg")}>
            <div className={styles.user_row}>
                <div className={styles.user_history_left}>
                    <div className={styles.header_info}>
                        <div className={styles.user_avatar}>
                            <img alt="" src="https://cdn3.iconfinder.com/data/icons/essential-rounded/64/Rounded-31-512.png" />
                        </div>
                        <div className={styles.user_name}>
                            <p>
                                <span className={styles.user_info}>Name: </span>
                                {userCurrent?.userName}
                            </p>
                            <p>
                                <span className={styles.user_info}>Phone: </span>
                                {userCurrent?.phone}
                            </p>
                        </div>
                    </div>
                    {
                        menuUserTab.map((item, index) => (
                            <div
                                onClick={() => handleClickUserTab(item.id)}
                                key={item.id}
                                className={cx(styles.user_tab, statusUserTab === item.id ? "user_tab_hover" : "")}>
                                <p>{item.icon}</p>
                                <p>{item.title}</p>
                            </div>
                        ))

                    }
                    <div
                        className={cx(styles.user_tab)} onClick={handleClickLogout}>
                        <p><IoIosLogOut /></p>
                        <p>Logout</p>
                    </div>
                </div>
                <div className={styles.user_history_right}>
                    {
                        statusUserTab === 1 &&
                        <ChangePassword />
                    }
                    {
                        statusUserTab === 2 &&
                        <FavoriteList />
                    }
                    {
                        statusUserTab === 3 &&
                        <HistoryBooking />
                    }
                </div>
            </div>
        </div >
    );
};

export default User;
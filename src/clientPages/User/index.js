import React, { useState } from 'react';
import styles from './User.module.scss'
import classNames from 'classnames/bind';
import clsx from 'clsx'
import { menuUserTab } from '../../ultil/menu';
import ChangePassword from '../ChangePassword';
import HistoryBooking from '../BookingHistory';
import { IoIosLogOut } from 'react-icons/io';

const cx = classNames.bind(styles)
const User = () => {
    const [statusUserTab, setClickUserTab] = useState(3)
    // const [selectUserTab, setSelectUserTab] = useState(3)

    const handleClickUserTab = (id) => {
        setClickUserTab(id)
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
                                User name
                            </p>
                            <p>
                                <span className={styles.user_info}>Phone: </span>
                                +123 123 321
                            </p>
                        </div>
                    </div>
                    {
                        menuUserTab.map((item, index) => (
                            <div
                                onClick={() => handleClickUserTab(item.id)}
                                key={index} className={cx(styles.user_tab, statusUserTab === item.id ? "user_tab_hover" : "")}>
                                <p>{item.icon}</p>
                                <p>{item.title}</p>
                            </div>
                        ))

                    }
                    <div
                        className={cx(styles.user_tab)}>
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
                        statusUserTab === 3 &&
                        <HistoryBooking />
                    }
                </div>
            </div>
        </div >
    );
};

export default User;
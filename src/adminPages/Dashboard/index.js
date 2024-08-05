import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';

import { fetchAdminOrderData } from '../../redux/Restaurant/adminorderSlice';
import { fetchUserData } from '../../redux/Restaurant/adminuserSlice';
import icons from '../../ultil/icons';

const cx = classNames.bind(styles);

const { FaRegEye, IoChatboxOutline, IoCartOutline, BsCurrencyDollar } = icons;

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Fetch orders and users from Redux state
    const orders = useSelector((state) => state.adminorder.adminOrders);
    const accounts = useSelector((state) => state.adminuser.users);
    const ordersStatus = useSelector((state) => state.adminorder.status);
    const usersStatus = useSelector((state) => state.adminuser.status);
    const ordersError = useSelector((state) => state.adminorder.error);
    const usersError = useSelector((state) => state.adminuser.error);

    useEffect(() => {
        dispatch(fetchAdminOrderData());
        dispatch(fetchUserData());
    }, [dispatch]);

    // Create a map of user IDs to user names
    const userMap = accounts.reduce((map, user) => {
        map[user.id] = user.userName;
        return map;
    }, {});

    const handleRecentUsersClick = () => {
        navigate('/admin-accounts');
    };

    // Limit the number of users displayed to 5
    const displayedUsers = accounts.slice(0, 5);

    return (
        <div className={cx('dashboard-container')}>
            <div className={cx('card-box')}>
                <div className={cx('card')}>
                    <div>
                        <div className={cx('numbers')}>1,455</div>
                        <div className={cx('card-name')}>Daily Views</div>
                    </div>
                    <div className={cx('icon')}>
                        <FaRegEye />
                    </div>
                </div>
                <div className={cx('card')}>
                    <div>
                        <div className={cx('numbers')}>65</div>
                        <div className={cx('card-name')}>Sales</div>
                    </div>
                    <div className={cx('icon')}>
                        <IoCartOutline />
                    </div>
                </div>
                <div className={cx('card')}>
                    <div>
                        <div className={cx('numbers')}>67</div>
                        <div className={cx('card-name')}>Comments</div>
                    </div>
                    <div className={cx('icon')}>
                        <IoChatboxOutline />
                    </div>
                </div>
                <div className={cx('card')}>
                    <div>
                        <div className={cx('numbers')}>67</div>
                        <div className={cx('card-name')}>Earning</div>
                    </div>
                    <div className={cx('icon')}>
                        <BsCurrencyDollar />
                    </div>
                </div>
            </div>

            <div className={cx('details')}>
                <div className={cx('recent-order')}>
                    <div className={cx('card-header')}>
                        <h2>Recent Orders</h2>
                        <a className={cx('btn')}>View All</a>
                    </div>
                    {ordersStatus === 'loading' && <p>Loading...</p>}
                    {ordersStatus === 'failed' && <p>Error: {ordersError}</p>}
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Deposit</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{userMap[order.userId] || 'Unknown'}</td> {/* Display the user name */}
                                    <td>{order.totalPrice}</td>
                                    <td>{order.deposit}</td>
                                    <td>{order.statusPayment ? 'Paid' : 'Pending'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className={cx('recent-customer')}>
                    <div className={cx('card-header')}>
                        <h2 onClick={handleRecentUsersClick} style={{ cursor: 'pointer' }}>Recent Users</h2>
                    </div>
                    {usersStatus === 'loading' && <p>Loading...</p>}
                    {usersStatus === 'failed' && <p>Error: {usersError}</p>}
                    <table>
                        <tbody>
                            {displayedUsers.map((account) => (
                                <tr key={account.id}>
                                    <td style={{ width: '60px' }}>
                                        <div className={cx('img')}>
                                            <img alt="" src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" />
                                        </div>
                                    </td>
                                    <td>
                                        <h4>{account.userName}</h4>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

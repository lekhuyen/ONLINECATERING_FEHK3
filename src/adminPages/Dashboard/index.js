import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Dashboard.module.scss';
import icons from '../../ultil/icons';
import { fetchAccountsData } from '../../redux/Accounts/accountsSlice';
import { fetchAdminOrderData } from '../../redux/Restaurant/adminorderSlice';


const cx = classNames.bind(styles);
const { FaRegEye, IoChatboxOutline, IoCartOutline, BsCurrencyDollar } = icons;

const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const accounts = useSelector((state) => state.accounts.items.slice(-5).reverse());
    const status = useSelector((state) => state.accounts.status);
    const error = useSelector((state) => state.accounts.error);
    const orders = useSelector((state) => state.adminorder.adminOrders); // Select orders from the Redux store

    useEffect(() => {
        dispatch(fetchAccountsData());
        dispatch(fetchAdminOrderData()); // Fetch orders when component mounts
    }, [dispatch]);

    const handleRecentUsersClick = () => {
        navigate('/admin-accounts');
    };

    return (
        <>
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

            {/* Order */}
            <div className={cx('details')}>
                <div className={cx('recent-order')}>
                    <div className={cx('card-header')}>
                        <h2>Recent Order</h2>
                        <a className={cx('btn')}>View All</a>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <td>Name</td>
                                <td>Price</td>
                                <td>Payment</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map((order) => (
                                <tr key={order.id}>
                                    <td>{order.name}</td>
                                    <td>{order.price}</td>
                                    <td>{order.payment}</td>
                                    <td>
                                        <span className={cx('status', order.status.toLowerCase().replace(' ', '-'))}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent customers */}
                <div className={cx('recent-customer')}>
                    <div className={cx('card-header')}>
                        <h2 onClick={handleRecentUsersClick} style={{ cursor: 'pointer' }}>Recent Users</h2>
                    </div>
                    <table>
                        <tbody>
                            {accounts.map((account) => (
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
        </>
    );
};

export default Dashboard;

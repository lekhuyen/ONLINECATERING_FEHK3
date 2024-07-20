import classNames from "classnames/bind";
import styles from './Dashboard.module.scss'
import icons from "../../ultil/icons";

const cx = classNames.bind(styles)
const { FaRegEye, IoChatboxOutline, IoCartOutline, BsCurrencyDollar } = icons

const DashBoard = () => {
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
                            <tr>
                                <td>Start Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td>
                                    <span className={cx('status', 'delivered')}>Delivered</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Start Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td>
                                    <span className={cx('status', 'pending')}>Pending</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Start Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td>
                                    <span className={cx('status', 'return')}>Return</span>
                                </td>
                            </tr>
                            <tr>
                                <td>Start Refrigerator</td>
                                <td>$1200</td>
                                <td>Paid</td>
                                <td>
                                    <span className={cx('status', 'in-progress')}>In Progress</span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* ------------ */}

                <div className={cx('recent-customer')}>
                    <div className={cx('card-header')}>
                        <h2>Recent Customer</h2>
                    </div>
                    <table>
                        <tr>
                            <td style={{width: '60px'}}>
                                <div className={cx('img')}>
                                    <img alt="" src="https://i.pinimg.com/564x/6d/99/bf/6d99bfd52d43534ee7fd1490f666a67f.jpg" />
                                </div>
                            </td>
                            <td>
                                <h4>David</h4>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '60px'}}>
                                <div className={cx('img')}>
                                    <img alt="" src="https://i.pinimg.com/564x/6d/99/bf/6d99bfd52d43534ee7fd1490f666a67f.jpg" />
                                </div>
                            </td>
                            <td>
                                <h4>David</h4>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '60px'}}>
                                <div className={cx('img')}>
                                    <img alt="" src="https://i.pinimg.com/564x/6d/99/bf/6d99bfd52d43534ee7fd1490f666a67f.jpg" />
                                </div>
                            </td>
                            <td>
                                <h4>David</h4>
                            </td>
                        </tr>
                        <tr>
                            <td style={{width: '60px'}}>
                                <div className={cx('img')}>
                                    <img alt="" src="https://i.pinimg.com/564x/6d/99/bf/6d99bfd52d43534ee7fd1490f666a67f.jpg" />
                                </div>
                            </td>
                            <td>
                                <h4>David</h4>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </>
    )
};

export default DashBoard;
import React from 'react';
import styles from './Order.module.scss'
import clsx from 'clsx';
import classNames from "classnames/bind";
import { FaMinusCircle, FaPlus } from 'react-icons/fa';
const cx = classNames.bind(styles)



const Order = () => {
    return (
        <div className={clsx(styles.order_container, "app__bg")}>
            <div className={cx("order_header_title")}><h2>Order Menu</h2></div>
            <div className={cx("order_row")}>
                <div className={cx("item-restaurant")}>
                    <div className={cx("item-restaurant-info")}>
                        <div className={cx("item-restaurant-1")}>
                            <div className={cx("item-restaurant-img")}>
                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                            </div>
                            <div className={cx("item-restaurant-name")}>
                                <span>Tra chanh xanh la xa lanh</span>
                                <p>Tra, duong</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-price")}>
                        <p>100K</p>
                    </div>
                    <div className={cx("item-restaurant-more")}>
                        <div><button><FaMinusCircle /></button></div>
                        <div><button><FaPlus /></button></div>
                    </div>
                </div>
                <div className={cx("item-restaurant")}>
                    <div className={cx("item-restaurant-info")}>
                        <div className={cx("item-restaurant-1")}>
                            <div className={cx("item-restaurant-img")}>
                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                            </div>
                            <div className={cx("item-restaurant-name")}>
                                <span>Tra chanh xanh la xa lanh</span>
                                <p>Tra, duong</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-price")}>
                        <p>100K</p>
                    </div>
                    <div className={cx("item-restaurant-more")}>
                        <div><button><FaMinusCircle /></button></div>
                        <div><button><FaPlus /></button></div>
                    </div>
                </div>
                <div className={cx("item-restaurant")}>
                    <div className={cx("item-restaurant-info")}>
                        <div className={cx("item-restaurant-1")}>
                            <div className={cx("item-restaurant-img")}>
                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                            </div>
                            <div className={cx("item-restaurant-name")}>
                                <span>Tra chanh xanh la xa lanh</span>
                                <p>Tra, duong</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-price")}>
                        <p>100K</p>
                    </div>
                    <div className={cx("item-restaurant-more")}>
                        <div><button><FaMinusCircle /></button></div>
                        <div><button><FaPlus /></button></div>
                    </div>
                </div>
                <div className={cx("item-restaurant")}>
                    <div className={cx("item-restaurant-info")}>
                        <div className={cx("item-restaurant-1")}>
                            <div className={cx("item-restaurant-img")}>
                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                            </div>
                            <div className={cx("item-restaurant-name")}>
                                <span>Tra chanh xanh la xa lanh</span>
                                <p>Tra, duong</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-price")}>
                        <p>100K</p>
                    </div>
                    <div className={cx("item-restaurant-more")}>
                        <div><button><FaMinusCircle /></button></div>
                        <div><button><FaPlus /></button></div>
                    </div>
                </div>
                <div className={cx("item-restaurant")}>
                    <div className={cx("item-restaurant-info")}>
                        <div className={cx("item-restaurant-1")}>
                            <div className={cx("item-restaurant-img")}>
                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                            </div>
                            <div className={cx("item-restaurant-name")}>
                                <span>Tra chanh xanh la xa lanh</span>
                                <p>Tra, duong</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-price")}>
                        <p>100K</p>
                    </div>
                    <div className={cx("item-restaurant-more")}>
                        <div><button><FaMinusCircle /></button></div>
                        <div><button><FaPlus /></button></div>
                    </div>
                </div>
                <div className={cx("item-restaurant")}>
                    <div className={cx("item-restaurant-info")}>
                        <div className={cx("item-restaurant-1")}>
                            <div className={cx("item-restaurant-img")}>
                                <img alt="" src="https://heremag-prod-app-deps-s3heremagassets-bfie27mzpk03.s3.amazonaws.com/wp-content/uploads/2019/11/12180349/paris-france-le-bar-des-pres-1-560x373.jpg" />
                            </div>
                            <div className={cx("item-restaurant-name")}>
                                <span>Tra chanh xanh la xa lanh</span>
                                <p>Tra, duong</p>
                            </div>
                        </div>
                    </div>
                    <div className={cx("item-price")}>
                        <p>100K</p>
                    </div>
                    <div className={cx("item-restaurant-more")}>
                        <div><button><FaMinusCircle /></button></div>
                        <div><button><FaPlus /></button></div>
                    </div>
                </div>
            </div>
            <div className={cx("total-price")}>
                <div>
                    <p>Total: <span>1000$</span></p>
                    <div className={cx("btn-order")}><button>Book</button></div>
                </div>
            </div>
        </div>
    );
};

export default Order;
import React, { useState } from 'react';
import styles from './Order.module.scss'
import clsx from 'clsx';
import classNames from "classnames/bind";
import { FaMinusCircle, FaPlus } from 'react-icons/fa';
import icons from '../../ultil/icons';
const cx = classNames.bind(styles)
const {
    FaRegUser, MdOutlineChildCare, MdAccessTime,
    IoMdClose,
    // FaPlus
} = icons


const Order = () => {

    const [showFormOrderStatus, setShowFormOrderStatus] = useState(false)

    const handleClickBtnShowFormOrder = () => {
        setShowFormOrderStatus(true)
    }
    const handleClickBtnCloseFormOrder = () => {
        setShowFormOrderStatus(false)
    }
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
                    <div className={cx("btn-order")}>
                        <button
                            onClick={handleClickBtnShowFormOrder}
                        >Book</button></div>
                </div>
            </div>

            {/* form book */}
            {
                showFormOrderStatus && (
                    <div className={cx("form-book-container", showFormOrderStatus === true ? "showFrom" : "closeFrom")}>
                        <div className={cx("btn-close-form-order")}>
                            <button onClick={handleClickBtnCloseFormOrder}><IoMdClose /></button>
                        </div>
                        <div className={cx("order-header-title")}>
                            <h3 className={cx("order_title")}>MAKE A RESERVATION</h3>
                            <span>To help us find the best table for you, select the preferred party size, date, and time of your reservation.</span>
                        </div>
                        <div>
                            <div className={cx("order-form")}>
                                <div className={cx("form")}>
                                    <div className={cx("older")}>
                                        <p><FaRegUser /><span>Adult:</span></p>
                                        <select className={cx(!showFormOrderStatus ? "bg" : "")}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                    <div className={cx("older")}>
                                        <p><MdOutlineChildCare /><span>Children:</span></p>
                                        <select className={cx(!showFormOrderStatus ? "bg" : "")}>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4</option>
                                        </select>
                                    </div>
                                </div>
                                <div className={cx("form")}>
                                    <div className={cx("time")}>
                                        <div>
                                            <p><MdAccessTime /><span>Booking Date:</span></p>
                                        </div>
                                        <input type="date" className={cx(!showFormOrderStatus ? "bg" : "")} />
                                    </div>
                                    <div className={cx("time")}>
                                        <p><MdAccessTime /><span>Booking Time:</span></p>
                                        <input type="time" className={cx(!showFormOrderStatus ? "bg" : "")} />
                                    </div>
                                </div>
                                <div className={cx("order-now")}>
                                    <button
                                        className={cx("order-now", !showFormOrderStatus ? "bg" : "")}>Book</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default Order;
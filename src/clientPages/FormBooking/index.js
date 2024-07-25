import styles from './FormBooking.module.scss'
import classNames from 'classnames/bind';
import icons from '../../ultil/icons';


const cx = classNames.bind(styles)
const {
    MdAccessTime,
    IoMdClose,
    FaTable,
    IoTabletLandscapeOutline,
} = icons
const FormBooking = ({ handleClickBtnCloseFormOrder, showFormOrderStatus }) => {

    return (
        <>
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
                            <p><FaTable /><span>Quantity:</span></p>
                            <select className={cx(!showFormOrderStatus ? "bg" : "")}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                            </select>
                        </div>
                        <div className={cx("older")}>
                            <p><IoTabletLandscapeOutline /><span>Lobby:</span></p>
                            <select className={cx(!showFormOrderStatus ? "bg" : "")}>
                                <option>--Choose Lobby--</option>
                                <option>Lobby 1</option>
                                <option>Lobby 2</option>
                                <option>Lobby 3</option>
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
                    <div className={cx("total_price")}>
                        <div>
                            Total: <span>$10000</span>
                        </div>
                        <div>
                            Deposit: <span>$300</span>
                        </div>
                    </div>
                    <div className={cx("order-now")}>
                        <button
                            className={cx("order-now", !showFormOrderStatus ? "bg" : "")}>Book</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormBooking;
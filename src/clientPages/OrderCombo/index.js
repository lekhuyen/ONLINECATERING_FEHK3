import styles from './OrderCombo.module.scss'
import clsx from 'clsx';
// import { FaCartPlus } from 'react-icons/fa';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';


const OrderCombo = () => {
    const navigate = useNavigate()
    return (
        <div className={clsx(styles.container, 'app__bg')}>
            <div className={styles.title}>
                <div className={styles.title_more}><h1>Combo Menu</h1></div>
            </div>
            <div className={styles.wapper}>
                <div className={styles.menu_container}>
                    <div className={clsx(styles.menu_item)}>
                        <div className={styles.table_title}>
                            <h5>PERSONAL COMBO</h5>
                        </div>
                        <div className={styles.menu_more}>
                            <div><img alt="" src="https://sohanews.sohacdn.com/zoom/480_300/2016/coca-cola-commercial-photography-1463360698380-crop-1463360708561-1463382302233-0-59-320-494-crop-1463382390812.jpg" /></div>
                        </div>
                        <div className={styles.table_description}>
                            <span>Bàn 10 người Bàn 10 ngườiBàn 10 ngườiBàn 10 ngườiBàn 10 ngườiBàn 10 người</span>
                        </div>
                        <div className={styles.menu_price}>
                            <p><RiMoneyDollarCircleLine />100</p>
                        </div>
                        <div className={styles.detail_title}>
                            <button onClick={() => navigate('/menu')}>Detail</button>
                        </div>
                    </div>
                    <div className={clsx(styles.menu_item)}>
                        <div className={styles.table_title}><h5>FRIENDS COMBO</h5></div>
                        <div className={styles.menu_more}>
                            <div><img alt="" src="https://sohanews.sohacdn.com/zoom/480_300/2016/coca-cola-commercial-photography-1463360698380-crop-1463360708561-1463382302233-0-59-320-494-crop-1463382390812.jpg" /></div>
                            {/* <div className={clsx(styles.icon_cart)}>
                                <FaCartPlus />
                            </div> */}
                        </div>
                        <div className={styles.table_description}>
                            <span>Bàn 10 người Bàn 10 ngườiBàn 10 ngườiBàn 10 ngườiBàn 10 ngườiBàn 10 người</span>
                        </div>
                        <div className={styles.menu_price}>
                            <p><RiMoneyDollarCircleLine />200</p>
                        </div>
                        <div className={styles.detail_title}>
                            <button onClick={() => navigate('/menu')}>Detail</button>
                        </div>
                    </div>
                    <div className={clsx(styles.menu_item)}>
                        <div className={styles.table_title}><h5>FAMILY COMBO</h5></div>
                        <div className={styles.menu_more}>
                            <div><img alt="" src="https://sohanews.sohacdn.com/zoom/480_300/2016/coca-cola-commercial-photography-1463360698380-crop-1463360708561-1463382302233-0-59-320-494-crop-1463382390812.jpg" /></div>
                            {/* <div className={clsx(styles.icon_cart)}>
                                <FaCartPlus />
                            </div> */}
                        </div>
                        <div className={styles.table_description}>
                            <span>Bàn 10 người Bàn 10 ngườiBàn 10 ngườiBàn 10 ngườiBàn 10 ngườiBàn 10 người</span>
                        </div>
                        <div className={styles.menu_price}>
                            <p><RiMoneyDollarCircleLine />300</p>
                        </div>
                        <div className={styles.detail_title}>
                            <button
                                onClick={() => navigate('/menu')}
                            >Detail</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCombo;
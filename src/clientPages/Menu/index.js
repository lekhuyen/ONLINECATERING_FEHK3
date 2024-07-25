import clsx from 'clsx';
import icons from '../../ultil/icons'
import styles from './Menu.module.scss'
import { menu } from '../../ultil/menu';
import { useState } from 'react';
import FormBooking from '../FormBooking';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles)

const {
    FaCartPlus,
    RiMoneyDollarCircleLine,
    
} = icons
const Menu = () => {
    const [menuChoose, setMenuChoose] = useState(1)
    const [showFormOrderStatus, setShowFormOrderStatus] = useState(false)

    const handleClickBtnShowFormOrder = () => {
        setShowFormOrderStatus(true)
    }
    const handleClickBtnCloseFormOrder = () => {
        setShowFormOrderStatus(false)
    }

    const handleOnclickMenu = (index) => {
        setMenuChoose(index)
    }


    return (

        <div className={clsx(styles.menuContainer, "app__bg")}>
            <div className={styles.menu_category}>
                <div className={styles.title}>
                    <div className={styles.title_more}><h3>Menu of standards</h3></div>
                    <div className={styles.book_btn}>
                        <button
                            onClick={handleClickBtnShowFormOrder}
                        >Book now</button>
                    </div>
                </div>
                <div className={styles.menu}>
                    {
                        menu.map((item, index) => (
                            <div
                                onClick={() => handleOnclickMenu(item.id)}
                                key={index} className={clsx(styles.menu_tab)}>
                                <div className={clsx(styles.menu_catery, menuChoose === item.id ? styles.active : "")}>
                                    <div>{item.icon}</div>
                                    <span>{item.title}</span>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className={styles.menu_container}>
                    {
                        menuChoose === 1 && (
                            <>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://sohanews.sohacdn.com/zoom/480_300/2016/coca-cola-commercial-photography-1463360698380-crop-1463360708561-1463382302233-0-59-320-494-crop-1463382390812.jpg" /></div>
                                        <div className={clsx(styles.icon_cart, styles.animate_amenu)}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://image.baophapluat.vn/w840/Uploaded/2024/zsgkqzztgymu/2017_04_19/2_QXOV.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://image.tienphong.vn/w890/Uploaded/2024/rkznae/2019_08_24/1547526536656_8576394_RQBH.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://cdn.pixabay.com/photo/2024/01/30/16/47/ai-generated-8542471_1280.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://giadinh.mediacdn.vn/296230595582509056/2021/9/17/photo-1-16318475587211840296470.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://static.vinwonders.com/production/Com-chien-Da-Nang-1.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://toplist.vn/images/800px/win-steak-1267156.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://toplist.vn/images/800px/win-steak-1267156.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://toplist.vn/images/800px/win-steak-1267156.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXbau14GTnKHZYxyXEylMTW5LMC77i4HUNQ&s" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://toplist.vn/images/800px/win-steak-1267156.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://toplist.vn/images/800px/win-steak-1267156.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                            </>

                        )
                    }
                    {
                        menuChoose === 2 && (
                            <>
                                <div className={clsx(styles.menu_item, styles.choose_menu_2)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://sohanews.sohacdn.com/zoom/480_300/2016/coca-cola-commercial-photography-1463360698380-crop-1463360708561-1463382302233-0-59-320-494-crop-1463382390812.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_2)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFXbau14GTnKHZYxyXEylMTW5LMC77i4HUNQ&s" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        menuChoose === 3 && (
                            <>
                                <div className={clsx(styles.menu_item, styles.choose_menu_3)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://image.baophapluat.vn/w840/Uploaded/2024/zsgkqzztgymu/2017_04_19/2_QXOV.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu_3)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://cdn.pixabay.com/photo/2024/01/30/16/47/ai-generated-8542471_1280.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                    {
                        menuChoose === 4 && (
                            <>
                                <div className={clsx(styles.menu_item, styles.choose_menu)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://giadinh.mediacdn.vn/296230595582509056/2021/9/17/photo-1-16318475587211840296470.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                                <div className={clsx(styles.menu_item, styles.choose_menu)}>
                                    <div className={styles.menu_more}>
                                        <div><img alt="" src="https://static.vinwonders.com/production/Com-chien-Da-Nang-1.jpg" /></div>
                                        <div className={styles.icon_cart}>
                                            <FaCartPlus />
                                        </div>
                                    </div>
                                    <div className={styles.menu_price}>
                                        <span>Coca</span>
                                        <p><RiMoneyDollarCircleLine color='red' />100</p>
                                    </div>
                                </div>
                            </>
                        )
                    }
                </div>
                {/* form booking */}
                {
                    showFormOrderStatus && (
                        <div className={cx("form-book-container", showFormOrderStatus === true ? "showFrom" : "closeFrom")}>
                            <FormBooking
                                showFormOrderStatus={showFormOrderStatus}
                                handleClickBtnCloseFormOrder={handleClickBtnCloseFormOrder} />
                        </div>
                    )
                }
            </div>

        </div>
    );
};

export default Menu;
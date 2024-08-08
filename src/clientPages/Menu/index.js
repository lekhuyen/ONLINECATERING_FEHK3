import clsx from 'clsx';
import icons from '../../ultil/icons'
import styles from './Menu.module.scss'
import { menu } from '../../ultil/menu';
import { useEffect, useState } from 'react';
import FormBooking from '../FormBooking';
import classNames from 'classnames/bind';
import { useNavigate, useParams } from 'react-router-dom';
import { apiGetAppetizerComboId, apiGetComboById, apiGetDessertComboId, apiGetDishByComboId, apiGetPromotionByComboId } from '../../apis/combo';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles)

const {
    FaCartPlus,
    RiMoneyDollarCircleLine,

} = icons
const Menu = () => {
    const [menuChoose, setMenuChoose] = useState(1)
    const [showFormOrderStatus, setShowFormOrderStatus] = useState(false)
    const [mainDish, setMainDish] = useState(null)
    const [mainDessert, setDessert] = useState(null)
    const [mainAppetizer, setAppetizer] = useState(null)
    const [mainPromotion, setPromotion] = useState(null)
    const [comboPrice, setComboPrice] = useState(null)
    const [userCurrent, setUserCurrent] = useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('')
    const { isLoggedIn } = useSelector(state => state.user)
    const [lobbyId, setLobbyId] = useState(null)

    // book form
    const [quantityTable, setQuantityTable] = useState(1)
    const [lobbyPrice, setLobbyPrice] = useState(0)
        
    const totalPrice = (quantityTable * comboPrice) + lobbyPrice
    const deposit = parseFloat(((quantityTable * comboPrice) + lobbyPrice) * 0.3).toFixed(2)
    const navigate = useNavigate()
    
    const { comboid } = useParams()
    const order = {
        userId: userCurrent,
        comboId: comboid,
        lobbyId: lobbyId,
        totalPrice: totalPrice,
        quantityTable: quantityTable,
        deposit: deposit,
        oganization: bookingDate + ' ' + bookingTime
    }
    
    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user.id);
        }
    }, [isLoggedIn])

    const getOneCombo = async () => {
        const responseDish = await apiGetDishByComboId(comboid)
        const responseDessert = await apiGetDessertComboId(comboid)
        const responseAppetizer = await apiGetAppetizerComboId(comboid)
        const responsePromotion = await apiGetPromotionByComboId(comboid)
        const responseComboOne = await apiGetComboById(comboid)

        if (responseComboOne.status === 0) {
            setComboPrice(responseComboOne.data.price)
        }
        if (responsePromotion.status === 0) {
            setPromotion(responsePromotion.data.promotions.$values)
        }
        if (responseAppetizer.status === 0) {
            setAppetizer(responseAppetizer.data.$values)
        }
        if (responseDessert.status === 0) {
            setDessert(responseDessert.data.$values)
        }
        if (responseDish.status === 0) {
            setMainDish(responseDish.data.$values)
        }
    }
    useEffect(() => {
        getOneCombo()
    }, [comboid])
    const handleClickBtnShowFormOrder = () => {
        if(isLoggedIn) {
            setShowFormOrderStatus(true)
        }
        else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please Login to comment!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/login')
                }
            });
        }
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
                    <div className={styles.title_more}><h1>Our Menu</h1></div>
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
                                {
                                    mainAppetizer?.length > 0 && mainAppetizer?.map(item => (
                                        <div key={item.appetizerId} className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                            <div className={styles.menu_more}>
                                                <div><img alt="" src={item.image} /></div>
                                                {/* <div className={clsx(styles.icon_cart, styles.animate_amenu)}>
                                                    <FaCartPlus />
                                                </div> */}
                                            </div>
                                            <div className={styles.menu_price}>
                                                <span>{item.name}</span>
                                                <p><RiMoneyDollarCircleLine color='red' />{item.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                    {
                        menuChoose === 2 && (
                            <>
                                {
                                    mainDish?.length > 0 && mainDish?.map(item => (
                                        <div key={item.id} className={clsx(styles.menu_item, styles.choose_menu_4)}>
                                            <div className={styles.menu_more}>
                                                <div><img alt="" src={item.image} /></div>
                                                {/* <div className={clsx(styles.icon_cart, styles.animate_amenu)}>
                                                    <FaCartPlus />
                                                </div> */}
                                            </div>
                                            <div className={styles.menu_price}>
                                                <span>{item.name}</span>
                                                <p><RiMoneyDollarCircleLine color='red' />{item.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }
                    {
                        menuChoose === 3 && (
                            <>
                                {
                                    mainDessert?.length > 0 && mainDessert?.map(item => (
                                        <div key={item.id} className={clsx(styles.menu_item, styles.choose_menu_3)}>
                                            <div className={styles.menu_more}>
                                                <div><img alt="" src={item?.image} /></div>
                                                {/* <div className={styles.icon_cart}>
                                                    <FaCartPlus />
                                                </div> */}
                                            </div>
                                            <div className={styles.menu_price}>
                                                <span>{item?.name}</span>
                                                <p><RiMoneyDollarCircleLine color='red' />{item?.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                                {/* <div className={clsx(styles.menu_item, styles.choose_menu_3)}>
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
                                </div> */}
                            </>
                        )
                    }
                    {
                        menuChoose === 5 && (
                            <>
                                {
                                    mainPromotion?.length > 0 && mainPromotion?.map(item => (
                                        <div key={item.id} className={clsx(styles.menu_item, styles.choose_menu)}>
                                            <div className={styles.menu_more}>
                                                <div><img alt="" src={item.imagePath} /></div>
                                                <div className={styles.icon_cart}>
                                                    <FaCartPlus />
                                                </div>
                                            </div>
                                            <div className={styles.menu_price}>
                                                <span>{item.name}</span>
                                                {/* <p><RiMoneyDollarCircleLine color='red' />100</p> */}
                                            </div>
                                        </div>
                                    ))
                                }
                                
                            </>
                        )
                    }
                    {/* Form Booking Button */}
                    <div className={styles.book_btn}>
                        <button
                            onClick={handleClickBtnShowFormOrder}
                        >BOOK NOW</button>
                    </div>
                </div>
                {/* form booking */}
                {
                    showFormOrderStatus && (
                        <div className={cx("form-book-container", showFormOrderStatus === true ? "showFrom" : "closeFrom")}>
                            <FormBooking
                                totalPrice={totalPrice}
                                deposit={deposit}
                                setQuantityTable={setQuantityTable}
                                setLobbyPrice={setLobbyPrice}
                                lobbyPrice={lobbyPrice}
                                quantityTable={quantityTable}
                                setBookingDate={setBookingDate}
                                setBookingTime={setBookingTime}
                                setLobbyId={setLobbyId}
                                order={order}

                                bookingTime={bookingTime}
                                bookingDate={bookingDate}
                                
                                
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
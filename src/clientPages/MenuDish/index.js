import clsx from 'clsx';
import icons from '../../ultil/icons'
import styles from './Menu.module.scss'
import { menuDish } from '../../ultil/menu';
import { useEffect, useState } from 'react';
import { apiGetAllAppetizer, apiGetAllDessert, apiGetAllDish } from '../../apis/menu';


const {
    FaCartPlus,
    RiMoneyDollarCircleLine,

} = icons
const MenuDish = () => {

    const [mainDish, setMainDish] = useState(null)
    const [mainDessert, setDessert] = useState(null)
    const [mainAppetizer, setAppetizer] = useState(null)
    const [menuChoose, setMenuChoose] = useState(1)
    

    const [cartAppetizer, setCartAppetizer] = useState(() => {
        const storedCart = localStorage.getItem('appetizer');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [cartDish, setCartDish] = useState(() => {
        const storedCart = localStorage.getItem('dish');
        return storedCart ? JSON.parse(storedCart) : [];
    });
    const [cartDessert, setCartDessert] = useState(() => {
        const storedCart = localStorage.getItem('dessert');
        return storedCart ? JSON.parse(storedCart) : [];
    });

    const getOneCombo = async () => {
        const responseDish = await apiGetAllDish()
        const responseDessert = await apiGetAllDessert()
        const responseAppetizer = await apiGetAllAppetizer()

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
    }, [])


    // const handleClickBtnShowFormOrder = () => {
    //     setShowFormOrderStatus(true)
    // }
    // const handleClickBtnCloseFormOrder = () => {
    //     setShowFormOrderStatus(false)
    // }

    const handleOnclickMenu = (index) => {
        setMenuChoose(index)
    }

    const handleClickCart = (item, type) => {
        if (type === 'appetizer') {
            setCartAppetizer(prevCart => {
                const existItem = prevCart.find(c => c.item.id === item.id);
                if (existItem) {
                    return prevCart.map(cartItem =>
                        cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    );
                } else {
                    return [...prevCart, { item, quantity: 1 }];
                }
            });
        } else if (type === 'dish') {
            setCartDish(prevCart => {
                const existItem = prevCart.find(c => c.item.id === item.id);
                if (existItem) {
                    return prevCart.map(cartItem =>
                        cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    );
                } else {
                    return [...prevCart, { item, quantity: 1 }];
                }
            });
        } else if (type === 'dessert') {
            setCartDessert(prevCart => {
                const existItem = prevCart.find(c => c.item.id === item.id);
                if (existItem) {
                    return prevCart.map(cartItem =>
                        cartItem.item.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                    );
                } else {
                    return [...prevCart, { item, quantity: 1 }];
                }
            });
        }
    }
    useEffect(() => {
        localStorage.setItem('dessert', JSON.stringify(cartDessert))
        localStorage.setItem('dish', JSON.stringify(cartDish))
        localStorage.setItem('appetizer', JSON.stringify(cartAppetizer))
    }, [cartDessert, cartDish, cartAppetizer])


    return (
        <div className={clsx(styles.menuContainer, "app__bg")}>
            <div className={styles.menu_category}>
                <div className={styles.title}>
                    <div className={styles.title_more}><h1>Our Menu</h1></div>
                </div>
                <div className={styles.menu}>
                    {
                        menuDish.map((item, index) => (
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
                                                <div><img alt="" src={item.appetizerImage} /></div>
                                                <div
                                                    onClick={() => handleClickCart(item, 'appetizer')}
                                                    className={clsx(styles.icon_cart, styles.animate_amenu)}>
                                                    <FaCartPlus />
                                                </div>
                                            </div>
                                            <div className={styles.menu_price}>
                                                <span>{item.appetizerName}</span>
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
                                                <div><img alt="" src={item.imagePath} /></div>
                                                <div
                                                    onClick={() => handleClickCart(item, 'dish')}
                                                    className={clsx(styles.icon_cart, styles.animate_amenu)}>
                                                    <FaCartPlus />
                                                </div>
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
                                                <div><img alt="" src={item?.dessertImage} /></div>
                                                <div
                                                    onClick={() => handleClickCart(item, 'dessert')}
                                                    className={styles.icon_cart}>
                                                    <FaCartPlus />
                                                </div>
                                            </div>
                                            <div className={styles.menu_price}>
                                                <span>{item?.dessertName}</span>
                                                <p><RiMoneyDollarCircleLine color='red' />{item?.price}</p>
                                            </div>
                                        </div>
                                    ))
                                }
                            </>
                        )
                    }

                    {/* Form Booking Button */}
                    {/* <div className={styles.book_btn}>
                        <button
                            onClick={handleClickBtnShowFormOrder}
                        >BOOK NOW</button>
                    </div> */}
                </div>
                {/* form booking */}
                {/* {
                    showFormOrderStatus && (
                        <div className={cx("form-book-container", showFormOrderStatus === true ? "showFrom" : "closeFrom")}>
                            <FormBooking
                                showFormOrderStatus={showFormOrderStatus}
                                handleClickBtnCloseFormOrder={handleClickBtnCloseFormOrder} />
                        </div>
                    )
                } */}
            </div>

        </div>
    );
};

export default MenuDish;
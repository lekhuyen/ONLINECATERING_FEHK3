import React, { useEffect, useState } from 'react';
import styles from './Order.module.scss'
import clsx from 'clsx';
import classNames from "classnames/bind";
import { FaMinusCircle, FaPlus } from 'react-icons/fa';
import FormBooking from '../FormBooking';
import { useSelector } from 'react-redux';
const cx = classNames.bind(styles)



const Order = () => {

    const [showFormOrderStatus, setShowFormOrderStatus] = useState(false)

    const [totalDesserts, setTotalDesserts] = useState(0);
    const [totalAppetizer, setTotalAppetizer] = useState(0);
    const [totalDish, setTotalDish] = useState(0);

    const [quantityTable, setQuantityTable] = useState(1)
    const [lobbyPrice, setLobbyPrice] = useState(0)
    const [comboPrice, setComboPrice] = useState(null)
    const [lobbyId, setLobbyId] = useState(null)

    const totalPrice = (totalDesserts + totalAppetizer + totalDish) + (quantityTable * comboPrice) + lobbyPrice
    const deposit = parseFloat(((quantityTable * comboPrice) + lobbyPrice) * 0.3).toFixed(2)

    const [userCurrent, setUserCurrent] = useState('')
    const [bookingDate, setBookingDate] = useState('')
    const [bookingTime, setBookingTime] = useState('')
    const { isLoggedIn } = useSelector(state => state.user)
    const [comboid, setComboid] = useState(null)

    const [appetizerDetails, setAppetizerDetails] = useState([])
    const [dessertDetails, setDessertDetails] = useState([])
    const [dishDetails, setDishDetails] = useState([])

    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user.id);
        }
    }, [isLoggedIn])

    const order = {
        userId: userCurrent,
        comboId: comboid,
        lobbyId: lobbyId,
        totalPrice: totalPrice,
        quantityTable: quantityTable,
        deposit: deposit,
        oganization: bookingDate + ' ' + bookingTime
    }

    
    const handleClickBtnShowFormOrder = () => {
        setShowFormOrderStatus(true)
    }
    const handleClickBtnCloseFormOrder = () => {
        setShowFormOrderStatus(false)
    }
    //handle book
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

    const cartAppet = cartAppetizer.map(appetizer => ({
        appetizerId: appetizer.item.id,
        quantity: appetizer.quantity,
        comboId: comboid,
    }));
    const cartDess = cartDessert.map(dessert => ({
        id: dessert.item.id,
        quantity: dessert.quantity,
        comboId: comboid,
    }));
    const cartDishs = cartDish.map(dish => ({
        id: dish.item.id,
        quantity: dish.quantity,
        comboId: comboid,
    }));

    useEffect(() => {
        var appetizer = JSON.parse(localStorage.getItem('appetizer')) || []
        var dessert = JSON.parse(localStorage.getItem('dessert')) || [];
        var dish = JSON.parse(localStorage.getItem('dish')) || []

        if (dessert.length > 0) setCartDessert(dessert)

        if (appetizer.length > 0) setCartAppetizer(appetizer)

        if (dish.length > 0) setCartDish(dish)

        // const appetizerDetails = appetizer.map(appetizer => ({
        //     id: appetizer.item.id,
        //     quantity: appetizer.quantity,
        //     comboid
        // }));
        // setAppetizerDetails(appetizerDetails)
        // const dessertDetails = dessert.map(dessert => ({
        //     id: dessert.item.id,
        //     quantity: dessert.quantity,
        // }));
        // setDessertDetails(dessertDetails)
        // const dishDetails = dish.map(dish => ({
        //     id: dish.item.id,
        //     quantity: dish.quantity,
        // }));

        // setDishDetails(dishDetails)
        
            
    }, []);

    

    useEffect(() => {
        let total = 0;
        cartDessert.forEach(cartItem => {
            total += (cartItem.item?.price || 0) * (cartItem.quantity || 0);
        });
        setTotalDesserts(total);
    }, [cartDessert]);

    useEffect(() => {
        let total = 0;
        cartAppetizer.forEach(cartItem => {
            total += (cartItem.item?.price || 0) * (cartItem.quantity || 0);
        });
        setTotalAppetizer(total);
    }, [cartAppetizer]);

    useEffect(() => {
        let total = 0;
        cartDish.forEach(cartItem => {
            total += (cartItem.item?.price || 0) * (cartItem.quantity || 0);
        });
        setTotalDish(total);
    }, [cartDish]);


    //tru so luong
    const handleClickMinusQuantityDessert = (id) => {
        setCartDessert(prev => {
            const updateCart = prev.map(cartItem => {
                if (cartItem.item.id === id) {
                    if (cartItem.quantity > 1) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 }
                    } else {
                        return null
                    }
                }
                return cartItem
            }).filter(item => item !== null)
            localStorage.setItem('dessert', JSON.stringify(updateCart))
            return updateCart
        })
    }

    const handleClickPlusQuantityDessert = (id) => {
        setCartDessert(prev => {
            const updatedCart = prev.map(cartItem => {
                if (cartItem.item.id === id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 }
                }
                return cartItem
            })
            localStorage.setItem('dessert', JSON.stringify(updatedCart));
            return updatedCart
        })
    }
    

    //tru SL appetizer
    const handleClickMinusQuantityAppetizer = (id) => {
        setCartAppetizer(prev => {
            const updateCart = prev.map(cartItem => {
                if (cartItem.item.id === id) {
                    if (cartItem.quantity > 1) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 }
                    } else {
                        return null
                    }
                }
                return cartItem
            }).filter(item => item !== null)
            localStorage.setItem('appetizer', JSON.stringify(updateCart))
            return updateCart
        })
    }
    
    const handleClickPlusQuantityAppetizer = (id) => {
        setCartAppetizer(prev => {
            const updatedCart = prev.map(cartItem => {
                if (cartItem.item.id === id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 }
                }
                return cartItem
            })
            localStorage.setItem('appetizer', JSON.stringify(updatedCart));
            return updatedCart
        })
    }
    

    //tru sl dish
    const handleClickMinusQuantityDish = (id) => {
        setCartDish(prev => {
            const updateCart = prev.map(cartItem => {
                if (cartItem.item.id === id) {
                    if (cartItem.quantity > 1) {
                        return { ...cartItem, quantity: cartItem.quantity - 1 }
                    } else {
                        return null
                    }
                }
                return cartItem
            }).filter(item => item !== null)
            localStorage.setItem('dish', JSON.stringify(updateCart))
            return updateCart
        })
    }
    const handleClickPlusQuantityDish = (id) => {
        setCartDish(prev => {
            const updatedCart = prev.map(cartItem => {
                if (cartItem.item.id === id) {
                    return { ...cartItem, quantity: cartItem.quantity + 1 }
                }
                return cartItem
            })
            localStorage.setItem('dish', JSON.stringify(updatedCart));
            return updatedCart
        })
    }
    return (
        <div className={clsx(styles.order_container, "app__bg")}>
            <div className={cx("order_header_title")}><h2>Order Menu</h2></div>
            <div className={cx("order_row")}>
                <h1>Dessert</h1>
                {
                    cartDessert?.length > 0 && cartDessert.map(dessert => (
                        <div className={cx("item-restaurant")}>
                            <div className={cx("item-restaurant-info")}>
                                <div className={cx("item-restaurant-1")}>
                                    <div className={cx("item-restaurant-img")}>
                                        <img alt="" src={dessert.item.dessertImage} />
                                    </div>
                                    <div className={cx("item-restaurant-name")}>
                                        <span>{dessert.item.dessertName}</span>
                                        <p>{dessert.item.price}K</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("item-price")}>
                                <p>{dessert.quantity}</p>
                            </div>
                            <div className={cx("item-restaurant-more")}>
                                <div><button
                                    onClick={() => handleClickMinusQuantityDessert(dessert.item.id)}
                                ><FaMinusCircle /></button></div>
                                <div><button
                                    onClick={() => handleClickPlusQuantityDessert(dessert.item.id)}
                                ><FaPlus /></button></div>
                            </div>
                        </div>
                    ))
                }


                <h1>Appettizer</h1>
                {
                    cartAppetizer?.length > 0 && cartAppetizer?.map(appettizer => (
                        <div className={cx("item-restaurant")}>
                            <div className={cx("item-restaurant-info")}>
                                <div className={cx("item-restaurant-1")}>
                                    <div className={cx("item-restaurant-img")}>
                                        <img alt="" src={appettizer.item.appetizerImage} />
                                    </div>
                                    <div className={cx("item-restaurant-name")}>
                                        <span>{appettizer.item.appetizerName}</span>
                                        <p>{appettizer.item.price}K</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("item-price")}>
                                <p>{appettizer.quantity}</p>
                            </div>
                            <div className={cx("item-restaurant-more")}>
                                <div><button
                                    onClick={() => handleClickMinusQuantityAppetizer(appettizer.item.id)}
                                ><FaMinusCircle /></button></div>
                                <div><button
                                onClick={() => handleClickPlusQuantityAppetizer(appettizer.item.id)}
                                ><FaPlus /></button></div>
                            </div>
                        </div>
                    ))
                }

                <h1>Dish</h1>
                {
                    cartDish?.length > 0 && cartDish?.map(dish => (
                        <div className={cx("item-restaurant")}>
                            <div className={cx("item-restaurant-info")}>
                                <div className={cx("item-restaurant-1")}>
                                    <div className={cx("item-restaurant-img")}>
                                        <img alt="" src={dish.item.image} />
                                    </div>
                                    <div className={cx("item-restaurant-name")}>
                                        <span>{dish.item.name}</span>
                                        <p>{dish.item.price}K</p>
                                    </div>
                                </div>
                            </div>
                            <div className={cx("item-price")}>
                                <p>{dish.quantity}</p>
                            </div>
                            <div className={cx("item-restaurant-more")}>
                                <div><button
                                    onClick={() => handleClickMinusQuantityDish(dish.item.id)}
                                    ><FaMinusCircle /></button></div>
                                <div><button
                                onClick={() => handleClickPlusQuantityDish(dish.item.id)}
                                ><FaPlus /></button></div>
                            </div>
                        </div>
                    ))
                }

                {/* <div className={cx("item-restaurant")}>
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
                </div> */}

            </div>
            <div className={cx("total-price")}>
                <div>
                    <p>Total: <span>{totalDesserts + totalAppetizer + totalDish}$</span></p>
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
                        <FormBooking
                            totalPrice={totalPrice}
                            setQuantityTable={setQuantityTable}
                            setLobbyPrice={setLobbyPrice}
                            setComboPrice={setComboPrice}
                            deposit={deposit}
                            setBookingDate={setBookingDate}
                            setBookingTime={setBookingTime}
                            order={order}
                            setComboid={setComboid}
                            setLobbyId={setLobbyId}
                            table

                            // appetizerDetails={appetizerDetails}
                            // dessertDetails={dessertDetails}
                            // dishDetails={dishDetails}
                            cartDess={cartDess}
                            cartDishs={cartDishs}
                            cartAppet={cartAppet}
                            showFormOrderStatus={showFormOrderStatus}
                            handleClickBtnCloseFormOrder={handleClickBtnCloseFormOrder} />
                    </div>
                )
            }
        </div>
    );
};

export default Order;
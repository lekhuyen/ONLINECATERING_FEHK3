import styles from './FormBooking.module.scss'
import classNames from 'classnames/bind';
import icons from '../../ultil/icons';
import { useEffect, useState } from 'react';
import { apiGetAllLobby, apiGetOneLobby } from '../../apis/lobby';
// import { apiGetAllCombo, apiGetComboById } from '../../apis/combo';
import { useParams } from 'react-router-dom';
import { apiAddOrder, apiAddOrderAppetizer, apiCreateOrder, apiGetOrderByLobbyId } from '../../apis/order';
import { apiPayment } from '../../apis/payment';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { statusOrder } from '../../redux/User/userSlice';
// import moment from 'moment/moment';
import { timeOrder } from '../../ultil/menu';



const cx = classNames.bind(styles)
const {
    MdAccessTime,
    IoMdClose,
    FaTable,
    IoTabletLandscapeOutline,
} = icons

const FormBooking = ({ handleClickBtnCloseFormOrder,
    showFormOrderStatus, setQuantityTable,
    setLobbyPrice, totalPrice, deposit, table, setComboPrice,
    setComboid,
    setBookingDate,
    setBookingTime,
    order,
    setLobbyId,
    bookingDate,
    bookingTime,
    quantityTable,
    lobbyPrice

}) => {
    const [lobby, setLobby] = useState(null)
    const [lobbyTime, setLobbyTime] = useState(null)
    const [timeOrderIndex, setTimeOrderIndex] = useState(null)
    // const [combos, setCombos] = useState([])

    const dispatch = useDispatch()
    // chua xong
    const { success } = useParams()
    if (success) {
        Swal.fire('Congratulation',
            success, 'success')
    }
    // ---------------


    // ---------------
    const [lobbySelect, setLobbySelect] = useState(null)
    // const [selectTable, setSelectTable] = useState(null)

    const { isLoggedIn } = useSelector(state => state.user)
    const [userCurrent, setUserCurrent] = useState('')
    const [timeOrderLoby, setTimeOrderLoby] = useState(null)

    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user);
        }
    }, [isLoggedIn])

    const getAllLobby = async () => {
        const response = await apiGetAllLobby()
        if (response.status === 0) {
            setLobby(response.data.$values)
        }
    }
    useEffect(() => {
        getAllLobby()
    }, [])

    const handleSelectTable = (e) => {
        if (setQuantityTable) setQuantityTable(e.target.value);
    }
    const now = new Date()
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();


    const handleChangeDate = (e) => {
        setBookingDate(e.target.value);
    }
    // const handleChangeTime = (e) => {
    //     setBookingTime(e.target.value);
    // }
    const hanldeClickTimeOrder = (value) => {
        setBookingTime(value);
    }

    useEffect(() => {
        const findMatchingBookingDates = () => {

            if (Array.isArray(lobbyTime)) {
                const found = lobbyTime.filter(lobby => {
                    const lobbyDateOnly = (lobby.oganization && typeof lobby.oganization === 'string')
                        ? lobby?.oganization?.split(' ')[0]
                        : '';

                    return bookingDate === lobbyDateOnly;
                });
                return found.map(lobby => lobby.oganization.split(' ')[1]);
            }
            return null;
        }
        const matchingLobbyTimes = findMatchingBookingDates();
        setTimeOrderLoby(matchingLobbyTimes);
    }, [bookingDate])


    const handleChangeLobby = async (e) => {
        const selectedId = e.target.value;
        if (selectedId !== "" && selectedId !== "--Choose Lobby--") setLobbySelect(selectedId);
        if (setLobbyId) setLobbyId(selectedId)
    }
    useEffect(() => {
        let lobbyId = lobbySelect
        const getLobbyTime = async () => {
            const resGetTimeLobby = await apiGetOrderByLobbyId(lobbyId)
            if (resGetTimeLobby.status === 0) {
                setLobbyTime(resGetTimeLobby?.data?.$values)
            }
        }
        if (lobbySelect !== null) {
            getLobbyTime()
        }
    }, [lobbySelect, bookingDate])

    // const handleChangeTable = (e) => {
    //     const selectedId = e.target.value;
    //     if (selectedId !== "" && selectedId !== "--Choose Table--") setSelectTable(selectedId);
    //     if (setComboid) setComboid(selectedId)

    // }
    // const getOneCombo = async () => {
    //     if (selectTable == null) {
    //         return
    //     } else {
    //         const responseComboOne = await apiGetComboById(selectTable)
    //         if (responseComboOne.status === 0) {
    //             setComboPrice(responseComboOne.data.price)
    //         }
    //     }
    // }
    // useEffect(() => {
    //     getOneCombo()
    // }, [selectTable])


    const getOneLobby = async () => {
        if (lobbySelect == null) {
            return
        } else {
            const response = await apiGetOneLobby(lobbySelect)
            if (response.status === 0) {
                if (setLobbyPrice) setLobbyPrice(response.data.price);
            }
        }

    }

    useEffect(() => {
        getOneLobby()
    }, [lobbySelect])


    //combo list
    // const getAllCombo = async () => {
    //     const response = await apiGetAllCombo()
    //     if (response.status === 0) {
    //         setCombos(response.data.$values)
    //     }
    // }
    // useEffect(() => {
    //     getAllCombo()
    // }, [])


    const handleClickCreateOrder = async () => {

        if (bookingTime === "" || bookingDate === "" || quantityTable === "" || lobbySelect === "") {
            Swal.fire('Oop!',
                "Not Empty", 'error')
        }
        else if (bookingDate < `${year}-${month}-${day}`) {
            Swal.fire('Oop!',
                "Invalid date", 'error')
        }
        else {
            const response = await apiAddOrder(order)
            if (response.status === 0) {
                localStorage.removeItem('appetizer');
                localStorage.removeItem('dish');
                localStorage.removeItem('dessert');

                dispatch(statusOrder({ stusOrder: false }))

                const data = {
                    orderType: 'ban tiec',
                    amount: response?.data?.deposit,
                    orderDescription: 'tiec',
                    name: userCurrent?.phone,
                    orderIdBooked: response?.data?.id
                }
                const resPayment = await apiPayment(data)
                if (resPayment.status === 0) {

                    window.location.href = resPayment?.url;
                }

            }
        }

    }

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
                        {/* {
                            table &&
                            <div className={cx("older")}>
                                <p><IoTabletLandscapeOutline /><span>Combo:</span></p>
                                <select
                                    onChange={handleChangeTable}
                                    className={cx(!showFormOrderStatus ? "bg" : "")}>
                                    <option value="--Choose Table--">--Choose Combo--</option>
                                    {
                                        combos?.length > 0 && combos?.map(item => (
                                            <option key={item.id} value={item.id}>{item?.name}-${item?.price}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        } */}
                        <div className={cx("older")}>
                            <p><FaTable /><span>Quantity(10 peoples/1 table):</span></p>
                            <select
                                onChange={handleSelectTable}
                                className={cx(!showFormOrderStatus ? "bg" : "")}
                                defaultValue={50}
                            >
                                {
                                    Array.from({ length: 50 }, (_, i) => (
                                        <option key={i + 50} value={i + 50}>{i + 50}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className={cx("older")}>
                            <p><IoTabletLandscapeOutline /><span>Lobby:</span></p>
                            <select
                                onChange={handleChangeLobby}
                                className={cx(!showFormOrderStatus ? "bg" : "")}>
                                <option value="--Choose Lobby--">--Choose Lobby--</option>
                                {
                                    lobby?.length > 0 && lobby?.map(item => (
                                        <option key={item.id} value={item.id}>{item?.lobbyName}-${item?.price}</option>
                                    ))
                                }
                            </select>
                        </div>

                    </div>
                    <div className={cx("form")}>
                        <div className={cx("time")}>
                            <div>
                                <p><MdAccessTime /><span>Booking Date:</span></p>
                            </div>
                            <input
                                onChange={handleChangeDate} type="date" className={cx(!showFormOrderStatus ? "bg" : "")} />
                        </div>
                        <div className={cx("time")}>
                            <p><MdAccessTime /><span>Booking Time:</span></p>
                            <div className={cx("time_order")}>
                                {
                                    timeOrder.map((item) => {
                                        const isInTimeOrderLoby = Array.isArray(timeOrderLoby) && timeOrderLoby.includes(item.title);
                                        const backgroundColor = timeOrderIndex === item.id
                                            ? 'green'
                                            : isInTimeOrderLoby
                                                ? 'red'
                                                : '#B33771';
                                        const pointerEvents = isInTimeOrderLoby ? 'none' : 'auto';
                                        return (
                                            <div
                                                onClick={() => {
                                                    setTimeOrderIndex(item.id)
                                                    hanldeClickTimeOrder(item.title)
                                                }}
                                                key={item.id}
                                                style={{
                                                    backgroundColor,
                                                    pointerEvents
                                                }}>
                                                <span >
                                                    {item.title}
                                                </span>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                            {/* <input
                                onChange={handleChangeTime} type="time" className={cx(!showFormOrderStatus ? "bg" : "")} /> */}
                        </div>
                    </div>
                    {/* <div className={cx("lobby_time")}>
                        <div className={cx("")}>
                            {lobbyTime?.length > 0 && (
                                <div className={cx("lobby_title")}>
                                    <p><MdAccessTime /><span>Lobby Booked:</span></p>
                                </div>
                            )}

                            {
                                lobbyTime?.length > 0 && lobbyTime?.map(item => (
                                    <div key={item.id} className={cx("lobby_booked_time")}>
                                        <span>{moment(item.oganization.split(' ')[0]).format("DD-MM-yyyy")}</span>
                                        <span>{item.oganization.split(' ')[1]}</span>
                                    </div>
                                ))
                            }

                        </div>
                        <div className={cx("time")}></div>
                    </div> */}
                    <div className={cx("total_price")}>
                        <div>
                            Total: <span>${totalPrice}</span>
                        </div>
                        <div>
                            Deposit: <span>${deposit}</span>
                        </div>
                    </div>
                    <div className={cx("order-now")}>
                        <button
                            // onClick={handleClickCheckout}
                            onClick={handleClickCreateOrder}
                            className={cx("order-now", !showFormOrderStatus ? "bg" : "")}>Book</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormBooking;
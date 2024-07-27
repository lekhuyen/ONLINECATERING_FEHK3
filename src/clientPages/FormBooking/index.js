import styles from './FormBooking.module.scss'
import classNames from 'classnames/bind';
import icons from '../../ultil/icons';
import { useEffect, useState } from 'react';
import { apiGetAllLobby, apiGetOneLobby } from '../../apis/lobby';
import { useParams } from 'react-router-dom';
import { apiGetAllCombo, apiGetComboById } from '../../apis/combo';


const cx = classNames.bind(styles)
const {
    MdAccessTime,
    IoMdClose,
    FaTable,
    IoTabletLandscapeOutline,
} = icons
const FormBooking = ({ handleClickBtnCloseFormOrder,
    showFormOrderStatus, setQuantityTable,
    setLobbyPrice, totalPrice, deposit, table, setComboPrice }) => {
    const [lobby, setLobby] = useState(null)
    const [combos, setCombos] = useState([])

    // ---------------
    // const [quantityTable, setQuantityTable] = useState(1)
    const [lobbySelect, setLobbySelect] = useState(null)
    const [selectTable, setSelectTable] = useState(null)
    // const [lobbyPrice, setLobbyPrice] = useState(0)
    // const [comboPrice, setComboPrice] = useState(null)


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
    const handleChangeLobby = (e) => {
        const selectedId = e.target.value;
        if (selectedId !== "" && selectedId !== "--Choose Lobby--") setLobbySelect(selectedId);
    }

    const handleChangeTable = (e) => {
        const selectedId = e.target.value;
        if (selectedId !== "" && selectedId !== "--Choose Table--") setSelectTable(selectedId);
    }
    const getOneCombo = async () => {
        if (selectTable == null) {
            return
        } else {
            const responseComboOne = await apiGetComboById(selectTable)
            if (responseComboOne.status === 0) {
                setComboPrice(responseComboOne.data.price)
            }
        }
    }
    useEffect(() => {
        getOneCombo()
    }, [selectTable])
    // console.log(comboPrice);


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
    const getAllCombo = async () => {
        const response = await apiGetAllCombo()
        if (response.status === 0) {
            setCombos(response.data.$values)
        }
    }
    useEffect(() => {
        getAllCombo()
    }, [])

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
                        {
                            table &&
                            <div className={cx("older")}>
                                <p><IoTabletLandscapeOutline /><span>Table:</span></p>
                                <select
                                    onChange={handleChangeTable}
                                    className={cx(!showFormOrderStatus ? "bg" : "")}>
                                    <option value="--Choose Table--">--Choose Table--</option>
                                    {
                                        combos?.length > 0 && combos?.map(item => (
                                            <option key={item.id} value={item.id}>{item?.name}-${item?.price}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        }
                        <div className={cx("older")}>
                            <p><FaTable /><span>Quantity:</span></p>
                            <select
                                onChange={handleSelectTable}
                                className={cx(!showFormOrderStatus ? "bg" : "")}>
                                {
                                    Array.from({ length: 20 }, (_, i) => (
                                        <option key={i} value={i + 1}>{i + 1}</option>
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
                            <input type="date" className={cx(!showFormOrderStatus ? "bg" : "")} />
                        </div>
                        <div className={cx("time")}>
                            <p><MdAccessTime /><span>Booking Time:</span></p>
                            <input type="time" className={cx(!showFormOrderStatus ? "bg" : "")} />
                        </div>
                    </div>
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
                            className={cx("order-now", !showFormOrderStatus ? "bg" : "")}>Book</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormBooking;
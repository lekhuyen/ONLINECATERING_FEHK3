import { useEffect, useState } from 'react';
import { apiDeleteOrderByUser, apiGetOrderByUserId } from '../../apis/order';
import styles from './History.module.scss'
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { apiPayment } from '../../apis/payment';

const HistoryBooking = ({ userId }) => {
    const [orderBooked, setOrderBooked] = useState(null)
    const [expandedIndex, setExpandedIndex] = useState(null);
    const { isLoggedIn } = useSelector(state => state.user)
    const [userCurrent, setUserCurrent] = useState('')

    

    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user);
        }
    }, [isLoggedIn])
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await apiGetOrderByUserId(userId);
                if (response.status === 0 && response.data?.$values) {
                    setOrderBooked(response.data.$values);
                } else {
                    setOrderBooked([]);
                }
            } catch (error) {
                setOrderBooked([]);
            }
        };
        fetchOrders();
    }, [userId]);

    


    const handleSubmitOrder = async (item) => {
        const data = {
            orderType: 'ban tiec',
            amount: item.deposit,
            orderDescription: 'tiec',
            name: userCurrent?.phone,
            orderIdBooked: item.id
        }
        
        const resPayment = await apiPayment(data)
        if (resPayment.status === 0) {
            window.location.href = resPayment?.url;
        }
    }

    const handleViewMore = (index) => {
        setExpandedIndex(expandedIndex === index ? null : index);
    }

    const handleDeleteBook = async (id) => {
        try {
            const data = {
                userId: userCurrent.id,
                orderId: id
            };
            const response = await apiDeleteOrderByUser(data);
            if (response.status === 0) {
                Swal.fire('Congratulations', response.message, 'success');
                const updatedOrders = orderBooked.filter(order => order.id !== id);
                setOrderBooked(updatedOrders);
            } else {
                Swal.fire('Error', response.message, 'error');
            }
        } catch (error) {
            console.error("Error deleting order:", error);
            Swal.fire('Error', 'An error occurred while deleting the order.', 'error');
        }

    }

    return (
        <div className={styles.user_booked_all}>
            <div className={styles.user_booked_title}>
                <h3>Your Booking History</h3>
            </div>
            {
                orderBooked?.length > 0 ?
                    (
                        orderBooked?.map((item, index) => (
                            <div>
                                <div>
                                    <table key={item.id} className={clsx(styles.table_booked, "table")}>
                                        <thead>
                                            <tr>
                                                <th>Quantity table</th>
                                                <th>Total price</th>
                                                <th>Deposit</th>
                                                <th>oganization</th>
                                                <th>Lobby</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{item.quantityTable}</td>
                                                <td>{item.totalPrice}</td>
                                                <td>{item.deposit}</td>
                                                <td>{item.oganization}</td>
                                                <td>{item.lobby?.lobbyName}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {/* render combo */}
                                {
                                    expandedIndex === index &&
                                    (
                                        item?.combo ? (
                                            <div>
                                                <div className={styles.user_booked_text}>
                                                    <div>
                                                        <span>{item.combo?.name}</span>
                                                    </div>
                                                    <div>
                                                        <span>${item.combo?.price}</span>
                                                    </div>
                                                </div>
                                                {
                                                    item?.combo?.comboAppetizers?.$values?.map(appetizer => (
                                                        <div key={item.$id} className={styles.user_booked_text}>
                                                            <div>
                                                                <span>{appetizer.appetizerName}</span>
                                                            </div>
                                                            <div>
                                                                <span>${appetizer.appetizerPrice}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    item?.combo?.comboDesserts?.$values?.map(dessert => (
                                                        <div key={item.$id} className={styles.user_booked_text}>
                                                            <div>
                                                                <span>{dessert.dessertName}</span>
                                                            </div>
                                                            <div>
                                                                <span>${dessert.dessertPrice}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                                {
                                                    item?.combo?.comboDishes?.$values?.map(dish => (
                                                        <div key={item.$id} className={styles.user_booked_text}>
                                                            <div>
                                                                <span>{dish.dishName}</span>
                                                            </div>
                                                            <div>
                                                                <span>${dish.dishPrice}</span>
                                                            </div>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        ) :
                                            (
                                                <div>
                                                    {
                                                        item?.getOrderAppetizers?.$values?.map(appetizer => (
                                                            <div key={item.$id} className={styles.user_booked_text}>
                                                                <div>
                                                                    <span>{appetizer?.appetizer?.name}</span>
                                                                </div>
                                                                <div>
                                                                    <span>${appetizer?.appetizer?.price}</span>
                                                                </div>
                                                                <div>
                                                                    <span>{appetizer.quantity}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        item?.getOrderDesserts?.$values?.map(dessert => (
                                                            <div key={item.$id} className={styles.user_booked_text}>
                                                                <div>
                                                                    <span>{dessert?.dessert?.name}</span>
                                                                </div>
                                                                <div>
                                                                    <span>${dessert?.dessert?.price}</span>
                                                                </div>
                                                                <div>
                                                                    <span>{dessert.quantity}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                    {
                                                        item?.getOrderDishes?.$values?.map(dish => (
                                                            <div key={item.$id} className={styles.user_booked_text}>
                                                                <div>
                                                                    <span>{dish?.dishDTO?.name}</span>
                                                                </div>
                                                                <div>
                                                                    <span>${dish?.dishDTO?.price}</span>
                                                                </div>
                                                                <div>
                                                                    <span>{dish.quantity}</span>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                    )
                                }
                                <div className={styles.delete_book}>
                                    <p
                                        style={{ cursor: "pointer" }}
                                        onClick={() => handleViewMore(index)}
                                    >
                                        {expandedIndex === index ? "View less" : "View more"}
                                    </p>
                                    <p
                                        onClick={() => handleDeleteBook(item.id)}
                                        style={{ cursor: "pointer" }}>
                                        Delete
                                    </p>

                                    <p
                                        onClick={()=>handleSubmitOrder(item)}
                                        style={{ cursor: "pointer", marginRight: "10px" }}>
                                        {!item?.statusPayment ? "Pay" : ""}
                                    </p>
                                </div>
                            </div>
                        ))
                    )
                    :
                    <>No bookings found.</>
            }
        </div>
    );
};

export default HistoryBooking;
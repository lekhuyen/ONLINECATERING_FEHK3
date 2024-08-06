import { useEffect, useState } from 'react';
import { apiGetOrderByUserId } from '../../apis/order';
import styles from './History.module.scss'

const HistoryBooking = ({userId}) => {
    const [orderBooked, setOrderBooked] = useState(null)
    
    const getOrder = async () => {
        const response = await apiGetOrderByUserId(userId);
        console.log(response);
        if(response.status === 0) {
            setOrderBooked(response?.data?.$values)
        }
        
    }
    console.log(orderBooked);
    
    useEffect(() => {
        getOrder()
    }, [])

    return (
        <div className={styles.user_booked_all}>
            <div className={styles.user_booked_title}>
                <h3>Your Booking History</h3>
            </div>
            <div className={styles.user_booked_text}>
                <div>
                    <span>onlinecatering</span>
                </div>
                <div>
                    <span>12/12</span>
                </div>
                <div>
                    <span>$123</span>
                </div>
            </div>
            <div className={styles.user_booked_text}>
                <div>
                    <span>onlinecatering</span>
                </div>
                <div>
                    <span>12/12</span>
                </div>
                <div>
                    <span>$123</span>
                </div>
            </div>
            <div className={styles.user_booked_text}>
                <div>
                    <span>onlinecatering</span>
                </div>
                <div>
                    <span>12/12</span>
                </div>
                <div>
                    <span>$123</span>
                </div>
            </div>
        </div>
    );
};

export default HistoryBooking;
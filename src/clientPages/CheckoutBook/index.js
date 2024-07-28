import { useEffect, useState } from 'react';
import styles from './CheckoutBook.module.scss'
import clsx from 'clsx';
import { useSelector } from 'react-redux';

const CheckoutBook = () => {

    const [userCurrent, setUserCurrent] = useState('')
    const { isLoggedIn } = useSelector(state => state.user)

    useEffect(() => {
        if (isLoggedIn) {
            var user = JSON.parse(localStorage.getItem("userCurrent"))
            setUserCurrent(user);
        }
    }, [isLoggedIn])
    return (
        <div className={clsx(styles.checkout_container, "app__bg")}>
            <div className={styles.checkout_info}>
                <table class={clsx(styles.checkout_tatle,"table")}>
                    <thead>
                        <tr>
                            <th>UserName</th>
                            <th>Phone</th>
                            <th>Number of tables</th>
                            <th>Lobby</th>
                            <th>Booking date</th>
                            <th>Booking time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userCurrent.userName}</td>
                            <td>{userCurrent.phone}</td>
                            <td>john@example.com</td>
                            <td>john@example.com</td>
                            <td>john@example.com</td>
                            <td>john@example.com</td>
                        </tr>
                        <tr>
                            <td>Total</td>
                            <td colspan="5">
                                <div className={styles.total_price}>
                                    <p>$1000</p>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Deposit</td>
                            <td colspan="5">
                                <div className={styles.total_price}>
                                    <p>$100</p>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default CheckoutBook;
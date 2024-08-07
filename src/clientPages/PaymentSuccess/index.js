import styles from './paymaentSuccess.module.scss'
import { Link } from 'react-router-dom';
import clsx from 'clsx';


const PaymentSuccess = () => {

    return (
        <div className={styles.payment_success}>
            <h1>You have successfully paid, we will contact you as soon as possible</h1>
            <Link to='/'>Go Home</Link>
        </div>
    );
};

export default PaymentSuccess;
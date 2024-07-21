import styles from './History.module.scss'

const HistoryBooking = () => {
    return (
        <>
            <div className={styles.user_booked_title}>
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
            <div className={styles.user_booked_title}>
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
            <div className={styles.user_booked_title}>
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
        </>
    );
};

export default HistoryBooking;
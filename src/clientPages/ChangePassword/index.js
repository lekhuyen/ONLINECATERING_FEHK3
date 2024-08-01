// src/clientPages/ChangePassword/index.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendForgotPasswordEmail, verifyOtp, updatePassword, resetState } from '../../redux/User/userForgotPasswordSlice'; // Correct path
import { useNavigate } from 'react-router-dom';
import styles from './ChangePass.module.scss'; // Import styles
import Loading from '../Loading';
import classNames from 'classnames/bind';
import clsx from 'clsx'
const cx = classNames.bind(styles)

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success, otpSent } = useSelector((state) => state.userForgotPassword);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const { isLoggedIn } = useSelector((state) => state.user);

    const handleSendEmail = () => {
        dispatch(sendForgotPasswordEmail(email));
    };

    const handleVerifyOtp = () => {
        dispatch(verifyOtp({ email, otp }));
    };

    const handleUpdatePassword = () => {
        dispatch(updatePassword({ email, password }));
    };
    useEffect(() => {
        if (success === "Password has been changed, please login again") {
            navigate('/login'); // Redirect to login page
        }
    }, [success, navigate]);
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login'); // Redirect to login if user is not logged in
        }
    }, [isLoggedIn, navigate]);
    return (
        <div>
            <h3>Change Password</h3>
            {otpSent ? (
                <div className={styles.otpAndPasswordContainer}>
                    <div className={styles.sectionContainer}>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <button className={styles.button} onClick={handleVerifyOtp}>Verify OTP</button>
                    </div>
                    <div className={styles.sectionContainer}>
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className={styles.button} onClick={handleUpdatePassword}>Update Password</button>
                    </div>
                </div>
            ) : (
                <div className={cx(styles.changePw_otp)}>
                    <input className={styles.inputField}
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleSendEmail}>Send OTP</button>
                </div>
            )}
             {loading && <Loading />} {/* Show Loading component when loading is true */}
            {error && <p>Error: {error}</p>}
            {success && <p>Success: {success}</p>}
        </div>
    );
};

export default ChangePassword;

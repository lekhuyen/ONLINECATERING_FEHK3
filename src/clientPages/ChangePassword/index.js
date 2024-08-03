import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isChangePasswordLogout, isChangePasswordLogoutOtp, sendForgotPasswordEmail, sendOtpMail, updatePassword } from '../../redux/User/userForgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePass.module.scss';
import Loading from '../Loading';
import classNames from 'classnames/bind';
import { logout, login } from '../../redux/User/userSlice';
import axios from 'axios';

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, success, otpSent, status, isChangePassword } = useSelector((state) => state.userForgotPassword);
    const { isLoggedIn } = useSelector((state) => state.user);

    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const handleSubmit = () => {
        if (otpSent) {
            if (newPassword !== confirmNewPassword) {
                // alert("New password and confirm new password must be matched.");
                return;
            }
            if (newPassword === oldPassword) {
                alert("New password cannot be the same as the old password.");
                return;
            }
            dispatch(updatePassword({ email, password: newPassword, otp }));
            // dispatch(logout());
        } else {
            dispatch(sendForgotPasswordEmail(email));

        }
    };
    useEffect(() => {
        if (status === 0) {
            dispatch(sendOtpMail({ isSendOtp: true }))
        }
    }, [status])
    useEffect(() => {
        if (isChangePassword === 0) {
            dispatch(logout())
            dispatch(isChangePasswordLogout())
            dispatch(isChangePasswordLogoutOtp())
        }
    }, [isChangePassword])
    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(sendOtpMail({ isSendOtp: false }))
            navigate('/login'); 
        }
    }, [isLoggedIn]);

    return (
        <div>
            <h3>Change Password</h3>
            <div className={styles.changePwContainer}>
                <input
                    className={styles.inputField}
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={otpSent}
                />
                {otpSent && (
                    <>
                        <input
                            className={styles.inputField}
                            type="text"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Old Password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            className={styles.inputField}
                            type="password"
                            placeholder="Confirm New Password"
                            value={confirmNewPassword}
                            onChange={(e) => setConfirmNewPassword(e.target.value)}
                        />
                    </>
                )}
                <button className={styles.button} onClick={handleSubmit}>
                    {otpSent ? 'Update Password' : 'Send OTP'}
                </button>
            </div>
            {loading && <Loading />}
            {status !== 0 || isChangePassword !== 0 ? <p>{error}</p> : ""}
        </div>
    );
};

export default ChangePassword;

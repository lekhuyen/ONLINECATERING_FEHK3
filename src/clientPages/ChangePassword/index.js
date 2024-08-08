import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword } from '../../redux/User/userForgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePass.module.scss';
import Loading from '../Loading';
import classNames from 'classnames/bind';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error, isChangePassword } = useSelector((state) => state.userForgotPassword);
    const { isLoggedIn, userEmail } = useSelector((state) => state.user); // Assume userEmail is stored here

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = () => {
        if (newPassword !== confirmNewPassword) {
            Swal.fire('Oop!', "New password and confirm new password must match.", 'error');
            return;
        }

        if (newPassword === oldPassword) {
            Swal.fire('Oop!', "New password cannot be the same as the old password.", 'error');
            return;
        }

        if (newPassword !== "" && confirmNewPassword !== "" && oldPassword !== "") {
            // Dispatch the updatePassword action with the user's email
            dispatch(updatePassword({ email: userEmail, oldPassword, newPassword }));
        } else {
            Swal.fire('Oop!', "Please fill in all fields.", 'error');
        }
    };

    useEffect(() => {
        if (isChangePassword === 0) {
            navigate('/login');
        }
    }, [isChangePassword, dispatch, navigate]);

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, dispatch, navigate]);

    return (
        <div>
            <h3>Change Password</h3>
            <div className={styles.changePwContainer}>
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
                <button className={styles.button} onClick={handleSubmit}>
                    Update Password
                </button>
            </div>
            {loading && <Loading />}
            {error && <p>{error}</p>}
        </div>
    );
};


export default ChangePassword;

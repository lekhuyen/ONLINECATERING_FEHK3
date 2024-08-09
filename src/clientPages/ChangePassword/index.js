import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updatePassword, validateOldPassword } from '../../redux/User/userForgotPasswordSlice';
import { useNavigate } from 'react-router-dom';
import styles from './ChangePass.module.scss';
import Loading from '../Loading';
import classNames from 'classnames/bind';
import Swal from 'sweetalert2';

const cx = classNames.bind(styles);

const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error } = useSelector((state) => state.userForgotPassword);
    const { userEmail } = useSelector((state) => {
        const user = state.user.userCurrent;
        return {
            isLoggedIn: user.isLoggedIn,
            userEmail: user.userEmail,
        };
    });

    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSubmit = async () => {
        if (!userEmail) {
            Swal.fire('Oops!', "User email is missing.", 'error');
            return;
        }

        if (newPassword !== confirmNewPassword) {
            Swal.fire('Oops!', "New password and confirm new password must match.", 'error');
            return;
        }

        if (newPassword === oldPassword) {
            Swal.fire('Oops!', "New password cannot be the same as the old password.", 'error');
            return;
        }

        if (newPassword && confirmNewPassword && oldPassword) {
            try {
                const resultAction = await dispatch(validateOldPassword({ userEmail, oldPassword }));

                if (validateOldPassword.fulfilled.match(resultAction)) {
                    const updateResult = await dispatch(updatePassword({ userEmail, oldPassword, newPassword }));

                    if (updatePassword.fulfilled.match(updateResult)) {
                        Swal.fire('Success!', "Password updated successfully.", 'success');
                        // Optionally, clear the error message and redirect
                        dispatch({ type: 'userForgotPassword/clearError' }); // Add this action to your slice
                        // navigate('/some-path'); // Optionally redirect
                    } else {
                        Swal.fire('Oops!', "Failed to update password. Please try again.", 'error');
                    }
                } else {
                    Swal.fire('Oops!', "Old password is incorrect.", 'error');
                }
            } catch (error) {
                console.error('Password change error:', error);
                Swal.fire('Oops!', error.message || "An error occurred during password update.", 'error');
            }
        } else {
            Swal.fire('Oops!', "Please fill in all fields.", 'error');
        }
    };

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
            {error && (
                <div>
                    <p>Error: {error.message || 'An error occurred'}</p>
                    {/* Render other error details if needed */}
                </div>
            )}
        </div>
    );
};

export default ChangePassword;

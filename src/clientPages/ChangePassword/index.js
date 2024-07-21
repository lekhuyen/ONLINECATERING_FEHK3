import React from 'react';
import styles from './ChangePass.module.scss'

const ChangePassword = () => {
    return (
        <>
            <div className={styles.user_pass_change_title}>
                <h5>Change the password</h5>
            </div>
            <div className={styles.user_pass_input}>
                <div className={styles.user_pass_input_title}><span>Old password:</span></div>
                <div>
                    <input type="password" placeholder='old password' />
                </div>
            </div>
            <div className={styles.user_pass_input}>
                <div className={styles.user_pass_input_title}><span>New password:</span></div>
                <div>
                    <input type="password" placeholder='new password' />
                </div>
            </div>
            <div className={styles.user_pass_input}>
                <div className={styles.user_pass_input_title}><span>Confirm password:</span></div>
                <div>
                    <input type="password" placeholder='confirm password' />
                </div>
            </div>
            <div className={styles.user_btn_update}>
                <button>Update</button>
            </div>
        </>
    );
};

export default ChangePassword;
import React from 'react';
import styles from './ChangePass.module.scss'

const ChangePassword = () => {
    return (
        <div className={styles.user_pass_all}>
            <div className={styles.user_pass_change_title}>
                <h3>Change Password</h3>
            </div>
            <div className={styles.user_pass_input}>
                <div className={styles.user_pass_input_title}><span>Old password:</span></div>
                <div>
                    <input type="password" placeholder='Type your old password' className={styles.user_pass_input_value}/>
                </div>
            </div>
            <div className={styles.user_pass_input}>
                <div className={styles.user_pass_input_title}><span>New password:</span></div>
                <div>
                    <input type="password" placeholder='Type your new password' className={styles.user_pass_input_value}/>
                </div>
            </div>
            <div className={styles.user_pass_input}>
                <div className={styles.user_pass_input_title}><span>Confirm password:</span></div>
                <div>
                    <input type="password" placeholder='Retype your new password' className={styles.user_pass_input_value}/>
                </div>
            </div>
            <div className={styles.user_btn_update}>
                <button>Update</button>
            </div>
        </div>
    );
};

export default ChangePassword;
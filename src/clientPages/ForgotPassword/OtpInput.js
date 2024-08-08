import classNames from "classnames/bind";
import styles from './ForgotPass.module.scss'
import PasswordInput from './passwordInput'
import { useState } from "react";
import { apiUserSendOtp } from "../../apis/user";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
const cx = classNames.bind(styles)

const OtpInput = () => {

    const [invalidFields, setInvalidFields] = useState([])
    const [isOtpOk, setIsOtpOk] = useState(false)
    const {mailOtp} = useSelector(state => state.user)
    

    const [payload, setPayload] = useState({
        otp: "",
        userEmail: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setPayload(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async () => {
        payload.userEmail = mailOtp
        if(payload.otp !== "" && payload.userEmail != "") {
                const response = await apiUserSendOtp(payload)
            if (response.status === 0) {
                setIsOtpOk(true)
            }
            else{
                Swal.fire('Oops!', response.message ? response.message : "OTP is incorrect", 'error');
            }
        }else{
            Swal.fire('Oop!',
            "Not Empty", 'error')
        }
        
    }
    return (
        <>
            {
                !isOtpOk && (
                    <div className={cx("input-box")}>
                        <input
                            name="otp"
                            value={payload.otp}
                            onChange={handleChange}
                            onFocus={() => setInvalidFields([])}
                            type="text"
                            placeholder="Otp"
                        />
                        <input
                            onChange={handleChange}
                            name="userEmail"
                            value={payload.userEmail}
                            onFocus={() => setInvalidFields([])}
                            type="hidden"
                            placeholder="Email"
                        />
                    </div>
                )
            }
            {
                isOtpOk &&
                <PasswordInput/>
            }
            {
                !isOtpOk && (
                    <div className={cx("input-box")}>
                        <button onClick={handleSubmit}>
                            Submit
                        </button>
                    </div>
                )
            }
        </>
    );
};

export default OtpInput;
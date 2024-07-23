import classNames from "classnames/bind";
import styles from './ForgotPass.module.scss'
import { useEffect, useState } from "react";
import OtpInput from "./OtpInput";
import Loading from "../Loading";
import { useDispatch, useSelector } from "react-redux";
import { sendMailOtp } from "../../redux/User/userActions";
import Swal from "sweetalert2";
import { resetStatusMessage } from "../../redux/User/userSlice";
import { useNavigate } from "react-router-dom";

const cx = classNames.bind(styles)

const EmailInput = () => {

    const [invalidFields, setInvalidFields] = useState([])
    const navigate = useNavigate()

    const dispath = useDispatch()
    const { isSendMailLoading, status, message } = useSelector(state => state.user)

    const [isOtp, setIsOtp] = useState(false)

    const [payload, setPayload] = useState({
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
        if (payload.userEmail.length > 0) {
            dispath(sendMailOtp(payload))
        }else {
            return
        }
    }

    useEffect(() => {
        if (status !== null) {
            if (status === 1) {
                dispath(resetStatusMessage())
                setIsOtp(false);
                Swal.fire('Oop!', message ? message : "Email is incorrec", 'error');
                setPayload({ userEmail: "" });
            } else {
                setIsOtp(true);
            }
        }
    }, [status, message]);

    return (
        <>

            <section>
                <div className={cx("color")}></div>
                <div className={cx("color")}></div>
                <div className={cx("color")}></div>
                <div className={cx("box")}>
                    <div className={cx("square")} style={{ "--i": 0 }}></div>
                    <div className={cx("square")} style={{ "--i": 1 }}></div>
                    <div className={cx("square")} style={{ "--i": 2 }}></div>
                    <div className={cx("square")} style={{ "--i": 3 }}></div>
                    <div className={cx("square")} style={{ "--i": 4 }}></div>
                    <div className={cx("container")}>
                        <div className={cx("form")}>
                            {
                                isSendMailLoading &&
                                <Loading />
                            }
                            <h2>Forgot Password</h2>
                            {!isOtp && (<div className={cx("input-box")}>
                                <input
                                    name="userEmail"
                                    value={payload.userEmail}
                                    onChange={handleChange}
                                    onFocus={() => setInvalidFields([])}
                                    type="text"
                                    placeholder="Email"
                                />
                            </div>)
                            }
                            {
                                isOtp &&
                                <>
                                    <OtpInput />
                                </>
                            }
                            {
                                !isOtp && (
                                    <div className={cx("input-box")}>
                                        <button onClick={handleSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                )
                            }
                            <p
                                onClick={() => {
                                    navigate('/login');
                                }}
                                className={cx('forget')}>Go Login</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmailInput;
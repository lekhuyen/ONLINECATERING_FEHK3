import classNames from "classnames/bind";
import styles from './Login.module.scss'
import { useCallback, useEffect, useState } from "react";
import { apiUserLogin, apiUserRegister } from "../../apis/user";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../../redux/User/userSlice'
import { validate } from "../../ultil/helper";
import EmailInput from "../ForgotPassword/emailInput";
import { sendMailRegister } from "../../redux/User/userActions";
import Loading from "../Loading";
import { isRegisterStatus, registerLogin } from "../../redux/User/userRegisterSlice";

const cx = classNames.bind(styles)

const Login = () => {
    const [register, setRegister] = useState(false)
    const [invalidFields, setInvalidFields] = useState([])
    const [isForgotPass, setIsForgotPass] = useState(false)
    const navigate = useNavigate()
    const dispath = useDispatch()
    const { token } = useParams();
    const { isRegister, registerStatus, registerMessage } = useSelector(state => state.register);

    const [payload, setPayload] = useState({
        userEmail: "",
        password: "",
        userName: "",
        phone: ""
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setPayload(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const resetPayload = () => {
        setPayload({
            userEmail: "",
            password: "",
            userName: "",
            phone: "",
        })
    }
    useEffect(() => {
        resetPayload()
    }, [register])

    const handleSubmit = useCallback(async () => {
        const { userName, phone, ...data } = payload

        const loginToken = {
            userEmail: data.userEmail,
            password: data.password,
            loginToken: token
        }
        const invalids = register ? validate(payload, setInvalidFields) : validate(data, setInvalidFields)

        if (invalids === 0) {
            if (register) {
                dispath(registerLogin(true))
                const response = await apiUserRegister(payload)
                if (response.status === 0) {
                    dispath(registerLogin(false))
                    Swal.fire('Congratulation',
                        response.message, 'success')
                        .then(() => {
                            setRegister(false)
                            resetPayload()
                        })
                } else {
                    dispath(registerLogin(true))
                    dispath(isRegisterStatus())
                    Swal.fire('Oop!',
                        response.message, 'error')
                }

            }
            else {
                const rs = await apiUserLogin(token ? loginToken : data)
                if (rs.status === 0) {

                    localStorage.setItem('userCurrent', JSON.stringify(rs.data))
                    dispath(login({
                        isLoggedIn: true,
                        userCurrent: rs.data,
                        token: rs.data.accessToken
                    }))
                    navigate('/')
                } else {
                    Swal.fire('Oop!',
                        rs.message, 'error')
                }
            }
        }

    }, [payload, register])


    return (
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
                            isRegister &&
                            <Loading />
                        }
                        <h2>{register ? "Register Form" : "Login Form"}</h2>
                        <>
                            <>
                                {
                                    !isForgotPass ? (
                                        <>
                                            {
                                                register && (
                                                    <>
                                                        <div className={cx("input-box")}>
                                                            <input
                                                                name="userName"
                                                                value={payload.userName}
                                                                onChange={handleChange}
                                                                onFocus={() => setInvalidFields([])}
                                                                type="text"
                                                                placeholder="UserName"
                                                            />
                                                            {
                                                                invalidFields?.some(el => el.name === "userName") &&
                                                                <small style={{ color: "red" }}>{invalidFields.find(el => el.name === "userName")?.mes}</small>
                                                            }
                                                        </div>
                                                        <div className={cx("input-box")}>
                                                            <input
                                                                name="phone"
                                                                value={payload.phone}
                                                                onChange={handleChange}
                                                                onFocus={() => setInvalidFields([])}
                                                                type="text"
                                                                placeholder="Phone"
                                                            />
                                                            {
                                                                invalidFields?.some(el => el.name === "phone") &&
                                                                <small style={{ color: "red" }}>{invalidFields.find(el => el.name === "phone")?.mes}</small>
                                                            }
                                                        </div>
                                                    </>
                                                )
                                            }
                                            <div className={cx("input-box")}>
                                                <input
                                                    name="userEmail"
                                                    value={payload.userEmail}
                                                    onChange={handleChange}
                                                    onFocus={() => setInvalidFields([])}
                                                    type="text"
                                                    placeholder="Email"
                                                />
                                                {
                                                    invalidFields?.some(el => el.name === "userEmail") &&
                                                    <small style={{ color: "red" }}>{invalidFields.find(el => el.name === "userEmail")?.mes}</small>
                                                }
                                            </div>
                                            <div className={cx("input-box")}>
                                                <input
                                                    name="password"
                                                    value={payload.password}
                                                    onChange={handleChange}
                                                    onFocus={() => setInvalidFields([])}
                                                    type="password"
                                                    placeholder="Password"
                                                />
                                                {
                                                    invalidFields?.some(el => el.name === "password") &&
                                                    <small style={{ color: "red" }}>{invalidFields.find(el => el.name === "password")?.mes}</small>
                                                }
                                            </div>
                                        </>
                                    ) : null
                                }
                                {
                                    !isForgotPass &&
                                    <div className={cx("input-box")}>
                                        <button onClick={handleSubmit}>
                                            {register ? "Register" : "Login"}
                                        </button>
                                    </div>
                                }
                            </>
                            <p
                                onClick={() => navigate('/forgot-password')}
                                className={cx('forget')}
                            >
                                Forgot Password
                            </p>
                            {
                                !register && (
                                    <p
                                        onClick={() => {
                                            setRegister(true)
                                            setInvalidFields([])
                                        }}
                                        className={cx('forget')}>Don't have an account?</p>
                                )
                            }
                            {
                                register && (
                                    <p
                                        onClick={() => {
                                            setRegister(false)
                                            setInvalidFields([])
                                            setIsForgotPass(false)
                                        }}
                                        className={cx('forget')}>Go Login</p>
                                )
                            }
                            <p
                                onClick={() => {
                                    navigate('/')
                                }}
                                className={cx('forget')}>Go Home</p>
                        </>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default Login;
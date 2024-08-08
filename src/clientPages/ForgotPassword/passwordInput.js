import classNames from "classnames/bind";
import styles from './ForgotPass.module.scss'
import { useState } from "react";
import { apiUserSendPassword } from "../../apis/user";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
const cx = classNames.bind(styles)

const PasswordInput = () => {

    const [invalidFields, setInvalidFields] = useState([])
    const {mailOtp} = useSelector(state => state.user)
    const navigate = useNavigate()

    const [payload, setPayload] = useState({
        password: "",
        userEmail: "",
    })
    const handleChange = (e) => {
        const { name, value } = e.target
        setPayload(prev => ({
            ...prev,
            [name]: value
        }))
    }
    payload.userEmail = mailOtp
    const handleSubmit = async () => {

        let errors = [];

        if (payload.password.length < 6) {
            errors.push({ name: "password", mes: "Password must be at least 6 characters long" });
        }

        if (errors.length > 0) {
            setInvalidFields(errors);
            return;
        }

        
        if(payload.password !== "" && payload.userEmail !== "") {
                const response = await apiUserSendPassword(payload)
            if (response.status === 0) {
                Swal.fire('Congratulation',
                    response.message, 'success')
                    .then(() => {
                        navigate('/login')
                    })
            }
        }else{
            Swal.fire('Oop!',
            "Password must not be empty", 'error')
        }
        
        
    }
    return (
        <>
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
                <input
                    onChange={handleChange}
                    name="userEmail"
                    value={payload.userEmail}
                    onFocus={() => setInvalidFields([])}
                    type="hidden"
                    placeholder="Email"
                />
            </div>
            <div className={cx("input-box")}>
                <button onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </>
    );
};

export default PasswordInput;
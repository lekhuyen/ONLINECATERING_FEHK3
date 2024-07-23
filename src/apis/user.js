import axios from "../configs/axiosConfig";

export const apiUserRegister = (data)  => axios({
    url: '/user-service/user',
    method: 'POST',
    data
})
export const apiUserLogin = (data)  => axios({
    url: '/user-service/user/login',
    method: 'POST',
    data
})
export const apiUserSendEmail = (data)  => axios({
    url: '/user-service/user/forgot-password',
    method: 'POST',
    data
})
export const apiUserSendOtp = (data)  => axios({
    url: '/user-service/user/otp',
    method: 'POST',
    data
})
export const apiUserSendPassword = (data)  => axios({
    url: '/user-service/user/update-password',
    method: 'POST',
    data
})
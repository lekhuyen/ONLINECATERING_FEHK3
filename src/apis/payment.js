import axios from "../configs/axiosConfig";

export const apiPayment = (data)  => axios({
    url: '/restaurant-service/paymentBook',
    method: 'POST',
    data
})
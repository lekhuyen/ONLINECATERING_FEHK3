import axios from "../configs/axiosConfig";

export const apiCreateOrder = (data)  => axios({
    url: `/restaurant-service/order/`,
    method: 'POST',
    data
})
export const apiGetOrderByUserId = (userId)  => axios({
    url: `/restaurant-service/order/booked/${userId}`,
    method: 'GET',
})
export const apiAddOrderAppetizer = (data)  => axios({
    url: `/restaurant-service/appetizerCombo/order-create-comboApettizer`,
    method: 'POST',
    data
})
import axios from "../configs/axiosConfig";

export const apiCreateOrder = (data)  => axios({
    url: `/restaurant-service/order/`,
    method: 'POST',
    data
})
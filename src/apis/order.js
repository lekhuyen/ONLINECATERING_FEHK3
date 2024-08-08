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

//bỏ
export const apiAddOrderAppetizer = (data)  => axios({
    url: `/restaurant-service/appetizerCombo/order-create-comboApettizer`,
    method: 'POST',
    data
})

//co dish, apppetizer, dessert
export const apiAddOrder = (data)  => axios({
    url: `/restaurant-service/order/combo`,
    method: 'POST',
    data
})

export const apiDeleteOrderByUser = (data)  => axios({
    url: `/restaurant-service/order/${data.userId}/${data.orderId}`,
    method: 'Delete',
})
export const apiGetOrderByLobbyId = (lobbyId)  => axios({
    url: `/restaurant-service/order/lobby/${lobbyId}`,
    method: 'Get',
})
import axios from "../configs/axiosConfig";

export const apiGetAllAppetizer = ()  => axios({
    url: `/restaurant-service/appetizer/`,
    method: 'GET',
})
export const apiGetAppetizerById = (appetizerId)  => axios({
    url: `/restaurant-service/appetizer/${appetizerId}`,
    method: 'GET',
})

export const apiGetAllDessert = ()  => axios({
    url: `/restaurant-service/dessert`,
    method: 'GET',
})
export const apiGetAllDish = ()  => axios({
    url: `/restaurant-service/dish/`,
    method: 'GET',
})
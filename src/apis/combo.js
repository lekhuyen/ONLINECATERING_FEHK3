import axios from "../configs/axiosConfig";

export const apiGetAllCombo = ()  => axios({
    url: '/restaurant-service/combo',
    method: 'GET',
})
export const apiGetComboById = (comboid)  => axios({
    url: `/restaurant-service/combo/${comboid}`,
    method: 'GET',
})
export const apiGetDishByComboId = (comboid)  => axios({
    url: `/restaurant-service/comboDish/${comboid}`,
    method: 'GET',
})
export const apiGetPromotionByComboId = (comboid)  => axios({
    url: `/restaurant-service/combo/${comboid}`,
    method: 'GET',
})
export const apiGetDessertComboId = (comboid)  => axios({
    url: `/restaurant-service/dessertCombo/${comboid}`,
    method: 'GET',
})
export const apiGetAppetizerComboId = (comboid)  => axios({
    url: `/restaurant-service/appetizerCombo/${comboid}`,
    method: 'GET',
})
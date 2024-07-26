import axios from "../configs/axiosConfig";

export const apiGetAllLobby = ()  => axios({
    url: '/restaurant-service/lobby',
    method: 'GET',
})
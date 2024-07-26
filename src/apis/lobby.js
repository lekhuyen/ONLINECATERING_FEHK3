import axios from "../configs/axiosConfig";

export const apiGetAllLobby = ()  => axios({
    url: '/restaurant-service/lobby',
    method: 'GET',
})
export const apiGetOneLobby = (lobbyId)  => axios({
    url: `/restaurant-service/lobby/${lobbyId}`,
    method: 'GET',
})
import axios from "axios";
import { apiUserRefreshToken } from "../apis/user";

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_API_URL,
    baseURL: "http://localhost:5246",
    headers: {
        'Content-Type': 'application/json'
    }
});

axiosInstance.interceptors.request.use(function (config) {
    const user = JSON.parse(localStorage.getItem('userCurrent'));
    if (user && user.token) {
        config.headers['Authorization'] = `Bearer ${user.accessToken}`;
    }
    return config;

}, function (error) {
    return Promise.reject(error);
});

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
    return response.data;
},  async (error) => {
    const originalRequest = error.config
    if(error.response.status === 401 && !originalRequest._retry){
        originalRequest._retry = true

        try {
            const user = JSON.parse(localStorage.getItem('userCurrent'))
            if(!user || !user.refeshToken) {
                return Promise.reject(error);
            }
            const refreshTokenResponse = await apiUserRefreshToken(user.refeshToken)
            user.accessToken = refreshTokenResponse.data.accessToken
            user.refeshToken = refreshTokenResponse.data.refeshToken
            localStorage.setItem('userCurrent', JSON.stringify(user))

            axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
            axiosInstance.headers['Authorization'] = `Bearer ${user.accessToken}`

            return axiosInstance(originalRequest);
        } catch (error) {
            localStorage.removeItem('user');
            return Promise.reject(error);
        }
    }

    return Promise.reject(error);
});

export default axiosInstance;
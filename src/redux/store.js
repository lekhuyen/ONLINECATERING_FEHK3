import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Login/loginSlice'
import aboutReducer from './Information/aboutSlice'
import newsSlice from './Information/newsSlice'
import aboutSlice from './Information/aboutSlice'
import contactSlice from './Information/contactSlice'

export const store = configureStore({
    reducer: {
        loginReducer: userSlice,
        about: aboutSlice,
        news: newsSlice,
        contacts: contactSlice,
    },
})
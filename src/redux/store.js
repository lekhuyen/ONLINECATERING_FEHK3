import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Login/loginSlice'

import newsSlice from './Information/newsSlice'
import aboutSlice from './Information/aboutSlice'
import contactSlice from './Information/contactSlice'
import aboutTypeSlice from './Information/aboutTypeSlice'

export const store = configureStore({
    reducer: {
        loginReducer: userSlice,
        about: aboutSlice,
        aboutTypes: aboutTypeSlice,
        news: newsSlice,
        contacts: contactSlice,
    },
})
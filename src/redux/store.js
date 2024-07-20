import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from './Login/loginSlice'

import newsSlice from './Information/newsSlice'
import aboutSlice from './Information/aboutSlice'
import contactSlice from './Information/contactSlice'
import aboutTypeSlice from './Information/aboutTypeSlice'
import newsTypeSlice from './Information/newsTypeSlice'

export const store = configureStore({
    reducer: {
        loginReducer: userSlice,
        about: aboutSlice,
        aboutTypes: aboutTypeSlice,
        news: newsSlice,
        newsTypes: newsTypeSlice,
        contacts: contactSlice,
    },
})
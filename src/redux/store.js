import { configureStore } from '@reduxjs/toolkit'
import userSlice from './User/userSlice'

import newsSlice from './Information/newsSlice'
import aboutSlice from './Information/aboutSlice'
import contactSlice from './Information/contactSlice'
import aboutTypeSlice from './Information/aboutTypeSlice'
import newsTypeSlice from './Information/newsTypeSlice'


import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore,FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER, } from 'redux-persist';
import comboSlice from './Restaurant/comboSlice'
import accountsSlice from './Accounts/accountsSlice'
import ServiceSlice from './Restaurant/ServiceSlice'
import dishSlice from './Restaurant/dishSlice'
import CustomCombo from '../adminPages/Restaurant/CustomCombo'
import customComboSlice from './Restaurant/customComboSlice'




const comonConfig = {
    key: 'user',
    storage
}
const userConfig  = {
    ...comonConfig,
    whitelist:['isLoggedIn', 'token', 'userCurrent']
}

export const store = configureStore({
    reducer: {
        user: persistReducer(userConfig, userSlice),
        about: aboutSlice,
        aboutTypes: aboutTypeSlice,
        news: newsSlice,
        newsTypes: newsTypeSlice,
        contacts: contactSlice,
        combo: comboSlice,
        accounts : accountsSlice,
        service : ServiceSlice,
        dish: dishSlice,
        customCombo: customComboSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor =   persistStore(store)
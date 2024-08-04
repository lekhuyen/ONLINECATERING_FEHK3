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

import customComboSlice from './Restaurant/customComboSlice'
import adminappetizersSlice from './Restaurant/adminappetizersSlice'
import admindessertSlice from './Restaurant/admindessertSlice'
import adminlobbySlice from './Restaurant/adminlobbySlice'

import userRegisterSlice from './User/userRegisterSlice'
import admincomboappetizerSlice from './Restaurant/admincomboappetizerSlice'
import admincombodessertSlice from './Restaurant/admincombodessertSlice'
import admincombodishSlice from './Restaurant/admincombodishSlice'
import adminmenuSlice from './Restaurant/adminmenuSlice'
import adminmenuimageSlice from './Restaurant/adminmenuimageSlice'
import adminorderSlice from './Restaurant/adminorderSlice'
import adminrestaurantSlice from './Restaurant/adminrestaurantSlice'

import userForgotPasswordReducer from './User/userForgotPasswordSlice'; 

import adminbookingSlice from './Restaurant/adminbookingSlice'
import promotionSlice from './Restaurant/promotionSlice'
import admincommentSlice from './Restaurant/admincommentSlice'





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
        userForgotPassword: userForgotPasswordReducer,
        user: persistReducer(userConfig, userSlice),
        register: userRegisterSlice,
        about: aboutSlice,
        aboutTypes: aboutTypeSlice,
        news: newsSlice,
        newsTypes: newsTypeSlice,
        contacts: contactSlice,
        combo: comboSlice,
        accounts : accountsSlice,
        service : ServiceSlice,
        dish: dishSlice,
        adminComboDish: admincombodishSlice,
        customCombo: customComboSlice,
        adminappetizer : adminappetizersSlice,
        adminComboAppetizer: admincomboappetizerSlice,
        admindessert: admindessertSlice,
        adminComboDessert: admincombodessertSlice,
        menu: adminmenuSlice,
        menuImages: adminmenuimageSlice,
        adminLobby: adminlobbySlice,
        promotion: promotionSlice,
        adminorder: adminorderSlice,
        adminrestaurant: adminrestaurantSlice,
        adminbooking: adminbookingSlice,
        admincomment: admincommentSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export const persistor =   persistStore(store)
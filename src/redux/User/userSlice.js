import { createSlice } from "@reduxjs/toolkit";
import * as actions from './userActions'

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userCurrent: null,
        token: null,

        //otp
        isSendMailLoading: false,
        mailOtp: null,
        status: null,
        message: ""
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
            state.userCurrent = action.payload.userCurrent
            state.token = action.payload.token
        },
        logout: (state, action) => {
            state.isLoggedIn = false
            state.userCurrent = null
            state.token = null
        },
        resetStatusMessage: (state) => {
            state.status = null;
            state.message = "";
        }
    },
    extraReducers: (builders) => {
        builders.addCase(actions.sendMailOtp.pending, (state) => {
            state.isSendMailLoading = true
        })
        builders.addCase(actions.sendMailOtp.fulfilled, (state, action) => {
            state.isSendMailLoading = false
            state.mailOtp = action.payload.data
            state.status = action.payload.status
            state.message = action.payload.message
        })
        builders.addCase(actions.sendMailOtp.rejected, (state, action) => {
            state.isSendMailLoading = true
            state.mailOtp = null
            state.status = null
            state.message = ''
        })
    }
    
})
export const {login, resetStatusMessage, logout  } = userSlice.actions
export default userSlice.reducer
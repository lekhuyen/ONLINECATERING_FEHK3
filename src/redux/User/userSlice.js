import { createSlice } from "@reduxjs/toolkit";
import * as actions from './userActions';

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoggedIn: false,
        userCurrent: null,
        token: null,
        userEmail: "",

        // OTP
        isSendMailLoading: false,
        mailOtp: null,
        status: null,
        message: "",

        orderStatus: false,
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.userCurrent = action.payload.userCurrent;
            state.token = action.payload.token;
            state.userEmail = action.payload.userEmail; // Ensure this is set
            localStorage.setItem('token', action.payload.token); 
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.userCurrent = null;
            state.token = null;
            localStorage.removeItem('token');
            localStorage.removeItem('userCurrent');
            state.userEmail = '';
        },
        resetStatusMessage: (state) => {
            state.status = null;
            state.message = "";
        },
        statusOrder: (state, action) => {
            state.orderStatus = action.payload.stusOrder;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(actions.sendMailOtp.pending, (state) => {
                state.isSendMailLoading = true;
            })
            .addCase(actions.sendMailOtp.fulfilled, (state, action) => {
                state.isSendMailLoading = false;
                state.mailOtp = action.payload.data;
                state.status = action.payload.status;
                state.message = action.payload.message;
            })
            .addCase(actions.sendMailOtp.rejected, (state, action) => {
                state.isSendMailLoading = false;
                state.mailOtp = null;
                state.status = null;
                state.message = action.payload || 'Failed to send OTP email';
            })
            .addCase(actions.sendMailRegister.pending, (state) => {
                // If needed, handle loading state for registration
            })
            .addCase(actions.sendMailRegister.fulfilled, (state, action) => {
                // Handle success for registration
            })
            .addCase(actions.sendMailRegister.rejected, (state, action) => {
                // Handle error for registration
            });
    }
});

export const { login, resetStatusMessage, logout, statusOrder } = userSlice.actions;
export default userSlice.reducer;

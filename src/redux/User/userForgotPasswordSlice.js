import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './userSlice';

// Define initial state
const initialState = {
    loading: false,
    error: null,
    success: null,
    otpSent: false,
    status: null,
    isChangePassword: null
};

// Define the API endpoint
const apiEndpoint = "http://localhost:5044/api/User";

// Thunks for async actions
export const sendForgotPasswordEmail = createAsyncThunk(
    'userForgotPassword/sendForgotPasswordEmail',
    async (email, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiEndpoint}/forgot-password`, { UserEmail: email });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'userForgotPassword/updatePassword',
    async ({ email, password, otp,oldPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiEndpoint}/update-password-otp`, { UserEmail: email, Password: password, Otp: otp ,oldPassword});
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// Create slice
const userForgotPasswordSlice = createSlice({
    name: 'userForgotPassword',
    initialState,
    reducers: {
        resetState: (state) => {
            state.loading = false;
            state.error = null;
            state.success = null;
            state.otpSent = false;
        },
        sendOtpMail: (state, action) => {
            state.otpSent = action.payload.isSendOtp;
        },
        isChangePasswordLogout: (state, action) => {
            state.isChangePassword = null;
            state.error = null;
            state.otpSent = false;
        },
        isChangePasswordLogoutOtp: (state, action) => {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendForgotPasswordEmail.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.status = action.payload.status;
            })
            .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
                state.loading = false;
            })

            .addCase(updatePassword.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.error = action.payload.message;
                state.isChangePassword = action.payload.status;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
            });
    },
});

export const { resetState, sendOtpMail, isChangePasswordLogout, isChangePasswordLogoutOtp } = userForgotPasswordSlice.actions;
export default userForgotPasswordSlice.reducer;

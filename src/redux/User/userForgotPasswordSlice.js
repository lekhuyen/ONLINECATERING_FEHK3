import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    password: "",
    userEmail: "",
    error: null,
    success: null,
    otpSent: false,
    status: null,
    isChangePassword: null,
    isLoggedIn: false,
    userInfo: {},  // To store user information
};

const apiEndpoint = "http://localhost:5044/api/User";

export const validateOldPassword = createAsyncThunk(
    'userForgotPassword/validateOldPassword',
    async ({ userEmail, oldPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiEndpoint}/validate-password`, { 
                userEmail,
                OldPassword: oldPassword // Ensure this matches the API's expected field name
            });
            console.log('Validation response:', response.data);
            return response.data;
        } catch (error) {
            console.error('Validation error:', error);
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'userForgotPassword/updatePassword',
    async ({ userEmail, oldPassword, newPassword }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiEndpoint}/update-password-change`, { 
                userEmail,
                OldPassword: oldPassword, 
                NewPassword: newPassword // Correct property name
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Update error');
        }
    }
);

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
        isChangePasswordLogout: (state) => {
            state.isChangePassword = null;
            state.error = null;
            state.otpSent = false;
        },
        isChangePasswordLogoutOtp: (state) => {
            state.status = null;
        },
        setUserEmail: (state, action) => {
            state.userEmail = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(validateOldPassword.pending, (state) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(validateOldPassword.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(validateOldPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || action.error.message;
            });
    },
});

export const { resetState, sendOtpMail, isChangePasswordLogout, isChangePasswordLogoutOtp, setUserEmail } = userForgotPasswordSlice.actions;
export default userForgotPasswordSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { logout } from './userSlice';

// Define initial state
const initialState = {
    loading: false,
    error: null,
    success: null,
    otpSent: false,
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

export const verifyOtp = createAsyncThunk(
    'userForgotPassword/verifyOtp',
    async ({ email, otp }, { rejectWithValue }) => {
        try {
            const response = await axios.post(`${apiEndpoint}/otp`, { UserEmail: email, Otp: otp });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const updatePassword = createAsyncThunk(
  'userForgotPassword/updatePassword',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
      try {
          const response = await axios.post(`${apiEndpoint}/update-password`, { UserEmail: email, Password: password });
          // Dispatch logout action after successful password update
          dispatch(logout());
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
    },
    extraReducers: (builder) => {
        builder
            .addCase(sendForgotPasswordEmail.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(sendForgotPasswordEmail.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.otpSent = true;
            })
            .addCase(sendForgotPasswordEmail.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Failed to send email';
            })
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.success = 'OTP verified successfully';
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'OTP verification failed';
            })
            .addCase(updatePassword.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
                state.otpSent = false; // Reset OTP sent flag on successful password update
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || 'Password update failed';
            });
    },
});

export const { resetState } = userForgotPasswordSlice.actions;
export default userForgotPasswordSlice.reducer;

import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserRegister, apiUserSendEmail } from "../../apis/user";

export const sendMailOtp = createAsyncThunk('user/sendmail', async(data, {rejectWithValue})=>{
    try {
        const response = await apiUserSendEmail(data);

        if (response.status !== 0) return rejectWithValue(response);
        return response;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to send OTP email');
    }
})

export const sendMailRegister = createAsyncThunk('user/sendmailRegister', async(data, {rejectWithValue})=>{
    try {
        const response = await apiUserRegister(data);

        if (response.status !== 0) return rejectWithValue(response);
        return response;
    } catch (error) {
        return rejectWithValue(error.message || 'Failed to register user');
    }
})
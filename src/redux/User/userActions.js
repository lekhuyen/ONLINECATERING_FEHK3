import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiUserRegister, apiUserSendEmail } from "../../apis/user";

export const sendMailOtp = createAsyncThunk('user/sendmail', async(data, {rejectWithValue})=>{
    const response = await apiUserSendEmail(data) 

    if(!response.status === 0) return rejectWithValue(response)
    return response
})

export const sendMailRegister = createAsyncThunk('user/sendmail', async(data, {rejectWithValue})=>{
    const response = await apiUserRegister(data) 
console.log(response);
    if(!response.status === 0) return rejectWithValue(response)
    return response
})
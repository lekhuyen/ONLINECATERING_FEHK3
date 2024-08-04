import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/User"; // Adjust endpoint as per your API

// Async thunk to fetch user data
export const fetchUserData = createAsyncThunk(
    "adminuser/fetchUserData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Assuming data structure needs $values extraction
        } catch (error) {
            throw new Error('Error fetching user data:', error.response.data);
        }
    }
);


const adminuserSlice = createSlice({
    name: "adminuser",
    initialState: {
        users: [], // Initial state can be an array of users
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {

        builder
        .addCase(fetchUserData.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchUserData.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.users = action.payload || [];
        })
        .addCase(fetchUserData.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
            
    },
});

export default adminuserSlice.reducer;

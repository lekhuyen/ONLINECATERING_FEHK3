import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Order";

export const fetchAdminOrderData = createAsyncThunk(
    "adminorder/fetchAdminOrderData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Adjust based on your API response structure
        } catch (error) {
            throw new Error('Error fetching admin order data:', error.response?.data || error.message);
        }
    }
);

export const createAdminOrder = createAsyncThunk(
    "adminorder/createAdminOrder",
    async (newAdminOrder) => {
        try {
            const response = await axios.post(apiEndpoint, newAdminOrder);
            return response.data;
        } catch (error) {
            throw new Error('Error creating admin order:', error.response?.data || error.message);
        }
    }
);

export const deleteAdminOrder = createAsyncThunk(
    "adminorder/deleteAdminOrder",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id;
        } catch (error) {
            throw new Error('Error deleting admin order:', error.response?.data || error.message);
        }
    }
);

const adminorderSlice = createSlice({
    name: "adminorder",
    initialState: {
        adminOrders: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminOrderData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAdminOrderData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminOrders = action.payload || [];
            })
            .addCase(fetchAdminOrderData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminOrders.push(action.payload);
            })
            .addCase(createAdminOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminOrder.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminOrders = state.adminOrders.filter(adminOrder => adminOrder.id !== action.payload);
            })
            .addCase(deleteAdminOrder.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminorderSlice.reducer;

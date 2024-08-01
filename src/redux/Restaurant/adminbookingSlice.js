// Import necessary methods
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Booking";

// Thunks for fetching, creating, updating, and deleting bookings
export const fetchBookingData = createAsyncThunk(
    "adminbooking/fetchBookingData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data; // Assuming your API returns the data directly
        } catch (error) {
            throw new Error('Error fetching booking data:', error.response?.data || error.message);
        }
    }
);

export const createAdminBookingItem = createAsyncThunk(
    "adminbooking/createBookingItem",
    async (newBookingItem) => {
        try {
            const response = await axios.post(apiEndpoint, newBookingItem);
            return response.data.data;
        } catch (error) {
            throw new Error('Error creating booking item:', error.response?.data || error.message);
        }
    }
);

export const updateAdminBookingItem = createAsyncThunk(
    "adminbooking/updateBookingItem",
    async (updatedBookingItem) => {
        try {
            const response = await axios.put(`${apiEndpoint}/${updatedBookingItem.id}`, updatedBookingItem);
            return response.data.data;
        } catch (error) {
            throw new Error('Error updating booking item:', error.response?.data || error.message);
        }
    }
);

export const deleteAdminBookingItem = createAsyncThunk(
    "adminbooking/deleteBookingItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id;
        } catch (error) {
            throw new Error('Error deleting booking item:', error.response?.data || error.message);
        }
    }
);

const adminbookingSlice = createSlice({
    name: "adminbooking",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookingData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchBookingData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload || [];
            })
            .addCase(fetchBookingData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminBookingItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminBookingItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createAdminBookingItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateAdminBookingItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAdminBookingItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateAdminBookingItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminBookingItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminBookingItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAdminBookingItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminbookingSlice.reducer;

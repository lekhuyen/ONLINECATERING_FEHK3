import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/AppetizerCombo";

// Async thunk to fetch combo-appetizer associations
export const fetchAdminComboAppetizerData = createAsyncThunk(
    "adminComboAppetizer/fetchAdminComboAppetizerData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            console.log('API Response:', response.data); // Log the response
            return response.data.data.$values;
        } catch (error) {
            throw new Error('Error fetching combo-appetizer data:', error.response.data);
        }
    }
);

// Async thunk to create a new combo-appetizer association
export const createAdminComboAppetizer = createAsyncThunk(
    "adminComboAppetizer/createAdminComboAppetizer",
    async ({ comboId, appetizerId }) => {
        try {
            const response = await axios.post(apiEndpoint, { comboId, appetizerId });
            return response.data;
        } catch (error) {
            throw new Error('Error creating combo-appetizer association:', error.response.data);
        }
    }
);

// Async thunk to delete a combo-appetizer association
export const deleteAdminComboAppetizer = createAsyncThunk(
    "adminComboAppetizer/deleteAdminComboAppetizer",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the Id of the deleted association for Redux state update
        } catch (error) {
            throw new Error('Error deleting combo-appetizer association:', error.response.data);
        }
    }
);

const adminComboAppetizerSlice = createSlice({
    name: "adminComboAppetizer",
    initialState: {
        adminComboAppetizers: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminComboAppetizerData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAdminComboAppetizerData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboAppetizers = action.payload || []; // Ensure it is an array
            })
            .addCase(fetchAdminComboAppetizerData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminComboAppetizer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminComboAppetizer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboAppetizers.push(action.payload);
            })
            .addCase(createAdminComboAppetizer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminComboAppetizer.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminComboAppetizer.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboAppetizers = state.adminComboAppetizers.filter(adminComboAppetizer =>
                    adminComboAppetizer.id !== action.payload
                );
            })
            .addCase(deleteAdminComboAppetizer.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminComboAppetizerSlice.reducer;

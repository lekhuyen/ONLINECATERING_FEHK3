import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/CustomCombo";

// Async thunk to fetch custom combo data
export const fetchCustomComboData = createAsyncThunk(
    "customCombo/fetchCustomComboData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching custom combo data:', error.response.data);
        }
    }
);

// Async thunk to create new custom combo
export const createCustomCombo = createAsyncThunk(
    "customCombo/createCustomCombo",
    async (newCustomCombo) => {
        try {
            const response = await axios.post(apiEndpoint, newCustomCombo);
            return response.data;
        } catch (error) {
            throw new Error('Error creating custom combo:', error.response.data);
        }
    }
);

// Async thunk to delete custom combo
export const deleteCustomCombo = createAsyncThunk(
    "customCombo/deleteCustomCombo",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted custom combo ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting custom combo:', error.response.data);
        }
    }
);

const customComboSlice = createSlice({
    name: "customCombo",
    initialState: {
        customCombos: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCustomComboData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCustomComboData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customCombos = action.payload.data || [];
            })
            .addCase(fetchCustomComboData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createCustomCombo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createCustomCombo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customCombos.push(action.payload.data);
            })
            .addCase(createCustomCombo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteCustomCombo.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteCustomCombo.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.customCombos = state.customCombos.filter(customCombo => customCombo.id !== action.payload);
            })
            .addCase(deleteCustomCombo.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default customComboSlice.reducer;

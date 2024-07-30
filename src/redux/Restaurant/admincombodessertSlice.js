import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint for ComboDessert
const apiEndpoint = "http://localhost:5265/api/DessertCombo";

// Async thunk to fetch combo-dessert associations
export const fetchAdminComboDessertData = createAsyncThunk(
    "adminComboDessert/fetchAdminComboDessertData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values || []; // Ensure it is an array
        } catch (error) {
            throw new Error('Error fetching combo-dessert data:', error.response?.data || error.message);
        }
    }
);

// Async thunk to create a new combo-dessert association
export const createAdminComboDessert = createAsyncThunk(
    "adminComboDessert/createAdminComboDessert",
    async ({ comboId, dessertId }) => {
        try {
            const response = await axios.post(apiEndpoint, { comboId, dessertId });
            return response.data;
        } catch (error) {
            throw new Error('Error creating combo-dessert association:', error.response?.data || error.message);
        }
    }
);

// Async thunk to delete a combo-dessert association
export const deleteAdminComboDessert = createAsyncThunk(
    "adminComboDessert/deleteAdminComboDessert",
    async (id, thunkAPI) => {
        try {
            const response = await fetch(`${apiEndpoint}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to delete combo-dessert association');
            }

            return id; // Return the ID of the deleted item
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const adminComboDessertSlice = createSlice({
    name: "adminComboDessert",
    initialState: {
        adminComboDesserts: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminComboDessertData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAdminComboDessertData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboDesserts = action.payload || []; // Ensure it is an array
            })
            .addCase(fetchAdminComboDessertData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminComboDessert.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminComboDessert.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboDesserts.push(action.payload);
            })
            .addCase(createAdminComboDessert.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminComboDessert.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminComboDessert.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboDesserts = state.adminComboDesserts.filter(
                    (adminComboDessert) => adminComboDessert.id !== action.payload
                );
            })
            .addCase(deleteAdminComboDessert.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default adminComboDessertSlice.reducer;

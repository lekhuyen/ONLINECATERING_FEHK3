import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/ComboDish";

// Async thunk to fetch combo-dish associations
export const fetchComboDishData = createAsyncThunk(
    "comboDish/fetchComboDishData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching combo-dish data:', error.response.data);
        }
    }
);

// Async thunk to create new combo-dish association
export const createComboDish = createAsyncThunk(
    "comboDish/createComboDish",
    async ({ dishId, comboId }) => {
        try {
            const response = await axios.post(apiEndpoint, { dishId, comboId });
            return response.data;
        } catch (error) {
            throw new Error('Error creating combo-dish association:', error.response.data);
        }
    }
);

// Async thunk to delete combo-dish association
export const deleteComboDish = createAsyncThunk(
    "comboDish/deleteComboDish",
    async ({ dishId, comboId }) => {
        try {
            await axios.delete(`${apiEndpoint}?dishId=${dishId}&comboId=${comboId}`);
            return { dishId, comboId }; // Return the deleted association for Redux state update
        } catch (error) {
            throw new Error('Error deleting combo-dish association:', error.response.data);
        }
    }
);

const comboDishSlice = createSlice({
    name: "comboDish",
    initialState: {
        comboDishes: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComboDishData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComboDishData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comboDishes = action.payload.data || [];
            })
            .addCase(fetchComboDishData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createComboDish.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createComboDish.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comboDishes.push(action.payload.data);
            })
            .addCase(createComboDish.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteComboDish.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteComboDish.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.comboDishes = state.comboDishes.filter(comboDish =>
                    !(comboDish.dishId === action.payload.dishId && comboDish.comboId === action.payload.comboId)
                );
            })
            .addCase(deleteComboDish.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default comboDishSlice.reducer;

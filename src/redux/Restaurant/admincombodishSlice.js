import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/ComboDish";

// Fetch combo-dish data
export const fetchAdminComboDishData = createAsyncThunk(
    "adminComboDish/fetchAdminComboDishData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Ensure it is an array
        } catch (error) {
            throw new Error('Error fetching combo-dish data:', error.response?.data || error.message);
        }
    }
);


export const createAdminComboDish = createAsyncThunk(
    "adminComboDish/createAdminComboDish",
    async ({ comboId, dishId }, thunkAPI) => {
      try {
        const response = await axios.post(apiEndpoint, { comboId, dishId });
        thunkAPI.dispatch(fetchAdminComboDishData()); // Refresh data after adding
        return response.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
  );

// Delete a combo-dish association
export const deleteAdminComboDish = createAsyncThunk(
    "adminComboDish/deleteAdminComboDish",
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(`${apiEndpoint}/${id}`);
            if (response.status === 200) {
                return id; // Return the ID of the deleted item
            }
            throw new Error('Failed to delete combo-dish association');
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

const adminComboDishSlice = createSlice({
    name: "adminComboDish",
    initialState: {
        adminComboDishes: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminComboDishData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAdminComboDishData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboDishes = action.payload || []; // Ensure it is an array
            })
            .addCase(fetchAdminComboDishData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminComboDish.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminComboDish.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboDishes.push(action.payload);
            })
            .addCase(createAdminComboDish.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminComboDish.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminComboDish.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.adminComboDishes = state.adminComboDishes.filter(
                    (dish) => dish.comboDishId !== action.payload
                );
            })
            .addCase(deleteAdminComboDish.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload;
            });
    },
});

export default adminComboDishSlice.reducer;

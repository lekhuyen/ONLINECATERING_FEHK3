// Import necessary methods
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Appetizer";

// Thunks for fetching, creating, updating, and deleting appetizers
export const fetchAppetizerData = createAsyncThunk(
    "adminappetizer/fetchAppetizerData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values;
        } catch (error) {
            throw new Error('Error fetching appetizer data:', error.response?.data || error.message);
        }
    }
);

export const createAdminAppetizerItem = createAsyncThunk(
    "adminappetizer/createAppetizerItem",
    async (newAppetizerItem) => {
        try {
            const formData = new FormData();
            formData.append('appetizerName', newAppetizerItem.AppetizerName);
            formData.append('price', newAppetizerItem.Price);
            formData.append('quantity', newAppetizerItem.Quantity);

            if (newAppetizerItem.formFile) {
                formData.append('formFile', newAppetizerItem.formFile);
            }

            const response = await axios.post(apiEndpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating appetizer item:', error.response?.data || error.message);
        }
    }
);

export const updateAdminAppetizerItem = createAsyncThunk(
    "adminappetizer/updateAppetizerItem",
    async ({ id, AppetizerName, Price, Quantity, imagePath, formFile }) => {
        try {
            const formData = new FormData();
            formData.append("Id", id);
            formData.append("AppetizerName", AppetizerName);
            formData.append("Price", Price);
            formData.append("Quantity", Quantity);

            if (formFile) {
                formData.append("formFile", formFile);
            }

            if (imagePath) {
                formData.append("AppetizerImage", JSON.stringify(imagePath));
            }

            const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            return response.data.data;
        } catch (error) {
            throw new Error("Error updating appetizer item:", error.response?.data || error.message);
        }
    }
);

export const deleteAdminAppetizerItem = createAsyncThunk(
    "adminappetizer/deleteAppetizerItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id;
        } catch (error) {
            throw new Error('Error deleting appetizer item:', error.response?.data || error.message);
        }
    }
);

const adminappetizersSlice = createSlice({
    name: "adminappetizer",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAppetizerData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAppetizerData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload || [];
            })
            .addCase(fetchAppetizerData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminAppetizerItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminAppetizerItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createAdminAppetizerItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateAdminAppetizerItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAdminAppetizerItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateAdminAppetizerItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminAppetizerItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminAppetizerItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAdminAppetizerItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminappetizersSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Combo";

// Async thunk to fetch combo data
export const fetchComboData = createAsyncThunk(
    "combo/fetchComboData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Adjust according to your API response structure
        } catch (error) {
            throw new Error('Error fetching combo data:', error.response.data);
        }
    }
);

export const fetchComboById = createAsyncThunk(
    "combo/fetchComboById",
    async (id) => {
        try {
            const response = await axios.get(`${apiEndpoint}/${id}`);
            return response.data.data.$values; // Adjust according to your API response structure
        } catch (error) {
            throw new Error('Error fetching combo item:', error.response.data);
        }
    }
);

// Async thunk to create new combo item
export const createComboItem = createAsyncThunk(
    "combo/createComboItem",
    async (newComboItem) => {
        try {
            const formData = new FormData();
            formData.append('name', newComboItem.name);
            formData.append('price', newComboItem.price);
            formData.append('type', newComboItem.type); // Ensure type is included in formData
            formData.append('status', newComboItem.status);
            if (newComboItem.formFile) {
                formData.append('formFile', newComboItem.formFile);
            }
            // Add other properties as needed based on your API endpoint requirements

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data; // Ensure you correctly return data from response
        } catch (error) {
            throw new Error('Error creating combo item:', error.response.data);
        }
    }
);

// Async thunk to update combo item
export const updateComboItem = createAsyncThunk(
    "combo/updateComboItem",
    async ({ id, name, price, type, status, imagePath, formFile }) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("type", type); // Ensure type is included in formData
            formData.append("status", status);
            if (formFile) {
                formData.append('formFile', formFile);
            }
            // Add other properties as needed based on your API endpoint requirements

            if (formFile) {
                formData.append("formFile", formFile);
            }

            if (imagePath && imagePath.length > 0) {
                formData.append("imagePath", JSON.stringify(imagePath));
            }

            const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data.data; // Ensure you correctly return data from response
        } catch (error) {
            throw new Error("Error updating combo item:", error.response.data);
        }
    }
);

// Async thunk to delete combo item
export const deleteComboItem = createAsyncThunk(
    "combo/deleteComboItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting combo item:', error.response.data);
        }
    }
);

const comboSlice = createSlice({
    name: "combo",
    initialState: {
        items: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchComboData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchComboData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload || []; // Ensure correct mapping of data
            })
            .addCase(fetchComboData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createComboItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createComboItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload); // Ensure correct mapping of data
            })
            .addCase(createComboItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateComboItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateComboItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateComboItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteComboItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteComboItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteComboItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default comboSlice.reducer;

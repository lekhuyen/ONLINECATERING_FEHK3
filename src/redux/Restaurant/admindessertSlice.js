// Import necessary methods
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Dessert";

// Thunks for fetching, creating, updating, and deleting desserts
export const fetchDessertData = createAsyncThunk(
    "admindessert/fetchDessertData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values;
        } catch (error) {
            throw new Error('Error fetching dessert data:', error.response?.data || error.message);
        }
    }
);

export const createAdminDessertItem = createAsyncThunk(
    "admindessert/createDessertItem",
    async (newDessertItem) => {
        try {
            const formData = new FormData();
            formData.append('dessertName', newDessertItem.DessertName);
            formData.append('price', newDessertItem.Price);
            formData.append('quantity', newDessertItem.Quantity);

            if (newDessertItem.formFile) {
                formData.append('formFile', newDessertItem.formFile);
            }

            const response = await axios.post(apiEndpoint, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating dessert item:', error.response?.data || error.message);
        }
    }
);

export const updateAdminDessertItem = createAsyncThunk(
    "admindessert/updateDessertItem",
    async ({ id, DessertName, Price, Quantity, imagePath, formFile }) => {
        try {
            const formData = new FormData();
            formData.append("Id", id);
            formData.append("DessertName", DessertName);
            formData.append("Price", Price);
            formData.append("Quantity", Quantity);

            if (formFile) {
                formData.append("formFile", formFile);
            }

            if (imagePath) {
                formData.append("DessertImage", JSON.stringify(imagePath));
            }

            const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            return response.data.data;
        } catch (error) {
            throw new Error("Error updating dessert item:", error.response?.data || error.message);
        }
    }
);

export const deleteAdminDessertItem = createAsyncThunk(
    "admindessert/deleteDessertItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id;
        } catch (error) {
            throw new Error('Error deleting dessert item:', error.response?.data || error.message);
        }
    }
);

const admindessertsSlice = createSlice({
    name: "admindessert",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDessertData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDessertData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload || [];
            })
            .addCase(fetchDessertData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAdminDessertItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminDessertItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createAdminDessertItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateAdminDessertItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAdminDessertItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateAdminDessertItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminDessertItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminDessertItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAdminDessertItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default admindessertsSlice.reducer;

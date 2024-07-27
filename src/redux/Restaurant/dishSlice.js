import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Dish";

// Async thunk to fetch dish data
export const fetchDishData = createAsyncThunk(
    "dish/fetchDishData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Extract the array of dishes
        } catch (error) {
            throw new Error('Error fetching dish data:', error.response.data);
        }
    }
);

// Async thunk to create new dish item
export const createDishItem = createAsyncThunk(
    "dish/createDishItem",
    async (newDishItem) => {
        try {
            const formData = new FormData();
            formData.append('name', newDishItem.name);
            formData.append('price', newDishItem.price);
            formData.append('status', newDishItem.status);

            if (newDishItem.formFile) {
                formData.append('formFile', newDishItem.formFile);
            }

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating dish item:', error.response.data);
        }
    }
);

// Async thunk to update dish item
export const updateDishItem = createAsyncThunk(
    "dish/updateDishItem",
    async ({ id, name, price, status, imagePath,  formFile }) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("price", price);
            formData.append("status", status);

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

            return response.data.data;
        } catch (error) {
            throw new Error("Error updating dish item:", error.response.data);
        }
    }
);

// Async thunk to delete dish item
export const deleteDishItem = createAsyncThunk(
    "dish/deleteDishItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting dish item:', error.response.data);
        }
    }
);

const dishSlice = createSlice({
    name: "dish",
    initialState: {
        items: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchDishData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchDishData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload || [];
            })
            .addCase(fetchDishData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createDishItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createDishItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createDishItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateDishItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateDishItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateDishItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteDishItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteDishItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteDishItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default dishSlice.reducer;

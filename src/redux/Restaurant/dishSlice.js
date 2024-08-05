import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Dish";

// Async thunk to fetch dish data
export const fetchDishData = createAsyncThunk(
    "dish/fetchDishData",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Adjust according to your API response structure
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error fetching dish data');
        }
    }
);


// Async thunk to create new dish item
export const createDishItem = createAsyncThunk(
    "dish/createDishItem",
    async (newDishItem, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('name', newDishItem.name);
            formData.append('price', newDishItem.price);
            formData.append('status', newDishItem.status);

            if (newDishItem.formFile) {
                formData.append('formFile', newDishItem.formFile);
            } else {
                throw new Error('formFile is required.');
            }

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error creating dish item');
        }
    }
);

// Async thunk to update dish item
export const updateDishItem = createAsyncThunk(
    "dish/updateDishItem",
    async ({ id, name, price, status, imagePath, formFile }, { rejectWithValue }) => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('name', name);
            formData.append('price', price);
            formData.append('status', status);

            if (formFile) {
                formData.append('formFile', formFile);
            }

            if (imagePath) {
                formData.append('imagePath', JSON.stringify(imagePath));
            }

            const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error updating dish item');
        }
    }
);

// Async thunk to delete dish item
export const deleteDishItem = createAsyncThunk(
    "dish/deleteDishItem",
    async (id, { rejectWithValue }) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            return rejectWithValue(error.response?.data || 'Error deleting dish item');
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
                state.error = action.payload;
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
                state.error = action.payload;
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
                state.error = action.payload;
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
                state.error = action.payload;
            });
    },
});

export default dishSlice.reducer;

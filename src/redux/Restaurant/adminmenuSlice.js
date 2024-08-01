// adminmenuSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Menu"; // Adjust endpoint as per your API

// Async thunk to fetch menu data
export const fetchMenuData = createAsyncThunk(
    "menu/fetchMenuData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            console.log("Response data:", response.data);
            return response.data.$values;
        } catch (error) {
            throw new Error('Error fetching menu data:', error.response?.data || error.message);
        }
    }
);

// Async thunk to create new menu item
export const createMenuItem = createAsyncThunk(
    "menu/createMenuItem",
    async (menuItem) => {
        try {
            const response = await axios.post(apiEndpoint, menuItem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating menu item:', error.response?.data || error.message);
        }
    }
);

// Async thunk to update menu item
export const updateMenuItem = createAsyncThunk(
    "menu/updateMenuItem",
    async ({ id, itemName, description, price }) => {
        try {
            const response = await axios.put(`${apiEndpoint}/${id}`, {
                id: Number(id),
                itemName,
                description,
                price: parseFloat(price) // Convert to float
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error updating menu item:', error.response?.data || error.message);
        }
    }
);

// Async thunk to delete menu item
export const deleteMenuItem = createAsyncThunk(
    "menu/deleteMenuItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting menu item:', error.response?.data || error.message);
        }
    }
);

const adminmenuSlice = createSlice({
    name: "menu",
    initialState: {
        items: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMenuData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchMenuData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createMenuItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createMenuItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateMenuItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateMenuItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteMenuItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteMenuItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteMenuItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminmenuSlice.reducer;

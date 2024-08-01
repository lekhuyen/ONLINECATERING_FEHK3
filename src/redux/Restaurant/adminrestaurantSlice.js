import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Restaurant";

export const fetchAdminRestaurantData = createAsyncThunk(
    "adminrestaurant/fetchAdminRestaurantData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values.map(restaurant => ({
                ...restaurant,
                categoryName: restaurant.category.title // Assuming the category title is fetched as 'title'
            }));
        } catch (error) {
            throw new Error('Error fetching admin restaurant data:', error.response.data);
        }
    }
);

export const editRestaurantItems = createAsyncThunk(
    "adminrestaurant/editRestaurantItems",
    async ({ id, restaurantName, address, city, open, close, categoryId }) => {
        try {
            const response = await axios.put(`${apiEndpoint}/${id}`, {
                id,
                restaurantName,
                city,
                address,
                open,
                close,
                categoryId, // Ensure categoryId is included in the payload
                // Add other properties as needed based on your API endpoint requirements
            });
            return response.data.data; // Adjust based on your API response structure
        } catch (error) {
            throw new Error("Error editing restaurant items:", error.response.data);
        }
    }
);

const adminrestaurantSlice = createSlice({
    name: "adminrestaurant",
    initialState: {
        restaurants: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdminRestaurantData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAdminRestaurantData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.restaurants = action.payload || [];
            })
            .addCase(fetchAdminRestaurantData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(editRestaurantItems.pending, (state) => {
                state.status = "loading";
            })
            .addCase(editRestaurantItems.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.restaurants = state.restaurants.map(restaurant =>
                    restaurant.id === action.payload.id ? action.payload : restaurant
                );
            })
            .addCase(editRestaurantItems.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminrestaurantSlice.reducer;

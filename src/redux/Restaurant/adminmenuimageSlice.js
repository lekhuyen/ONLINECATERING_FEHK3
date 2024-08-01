import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint for menu images
const apiEndpoint = "http://localhost:5265/api/MenuImages";

// Fetch menu images for a specific menu item
export const fetchMenuImages = createAsyncThunk(
    "menuImages/fetchMenuImages",
    async (menuId) => {
        try {
            const response = await axios.get(`${apiEndpoint}/images/${menuId}`);
            return response.data.data.$values; // Extracting image URLs from the response
        } catch (error) {
            throw new Error('Error fetching menu images:', error.response?.data || error.message);
        }
    }
);



const adminmenuimageSlice = createSlice({
    name: "menuImages",
    initialState: {
        images: [], // Initialize as empty array
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuImages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchMenuImages.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.images = action.payload; // Assuming action.payload is an array of images
            })
            .addCase(fetchMenuImages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminmenuimageSlice.reducer;

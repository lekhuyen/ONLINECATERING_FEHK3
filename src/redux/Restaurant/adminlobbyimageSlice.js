// adminlobbyimageSlice.js

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint
const apiEndpoint = "http://localhost:5265/api/LobbyImages";

// Fetch lobby images for a specific lobby
export const fetchLobbyImages = createAsyncThunk(
    "lobbyImages/fetchLobbyImages",
    async (lobbyId) => {
        try {
            const response = await axios.get(`${apiEndpoint}/images/${lobbyId}`);
            return response.data.data.$values; // Extracting image URLs from the response
        } catch (error) {
            throw new Error('Error fetching lobby images:', error.response?.data || error.message);
        }
    }
);


const adminlobbyimageSlice = createSlice({
    name: "lobbyImages",
    initialState: {
        images: [], // Initialize as empty array
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLobbyImages.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLobbyImages.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.images = action.payload; // Assuming action.payload is an array of images
            })
            .addCase(fetchLobbyImages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminlobbyimageSlice.reducer;

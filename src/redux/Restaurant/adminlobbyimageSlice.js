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
            const images = response.data.data.$values || []; // Ensure $values is defined
            return images;
        } catch (error) {
            throw new Error('Error fetching lobby images:', error.response?.data || error.message);
        }
    }
);

export const addLobbyImage = createAsyncThunk(
    'lobbyImages/addLobbyImage',
    async ({ lobbyId, formFiles }) => {
        try {
            const response = await axios.post(`/lobby/images/${lobbyId}`, formFiles, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            const images = response.data.data.$values || []; // Ensure $values is defined
            return images;
        } catch (error) {
            throw new Error('Error adding lobby image:', error.response?.data || error.message);
        }
    }
);
export const deleteLobbyImage = createAsyncThunk(
    'lobbyImages/deleteLobbyImage',
    async (payload, thunkAPI) => {
        const { lobbyId, imageId } = payload;
        try {
            const response = await axios.delete(`/api/lobbies/${lobbyId}/images/${imageId}`);
            return response.data; // Assuming the API returns a success message or relevant data
        } catch (error) {
            throw new Error('Error deleting lobby image:', error.response?.data || error.message);
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
            })
            .addCase(addLobbyImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(addLobbyImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.images.push(...action.payload); // Assuming action.payload is an array of added images
            })
            .addCase(addLobbyImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteLobbyImage.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteLobbyImage.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Optionally update state based on success response
            })
            .addCase(deleteLobbyImage.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Error deleting lobby image';
            });
    },
});

export default adminlobbyimageSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the API endpoint
const apiEndpoint = "http://localhost:5265/api/LobbyImages";

// Fetch lobby images for a specific lobby
export const fetchLobbyImages = createAsyncThunk(
    "lobbyImages/fetchLobbyImages",
    async (lobbyId) => {
        try {
            const response = await axios.get(`${apiEndpoint}/lobby/${lobbyId}`);
            // Adjust this line according to your API response
            return response.data.data.$values;
        } catch (error) {
            throw new Error('Error fetching lobby images:', error.response?.data || error.message);
        }
    }
);

const adminlobbyimageSlice = createSlice({
    name: "lobbyImages",
    initialState: {
        images: [],
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
                state.images = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchLobbyImages.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminlobbyimageSlice.reducer;

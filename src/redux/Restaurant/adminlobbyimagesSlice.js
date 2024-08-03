// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const apiEndpoint = "http://localhost:5265/api/LobbyImages";

// export const fetchLobbyImages = createAsyncThunk(
//     "lobbyImages/fetchLobbyImages",
//     async (lobbyId) => {
//         try {
//             const response = await axios.get(`${apiEndpoint}/images/${lobbyId}`);
//             const images = response.data.data.$values || []; // Ensure $values is defined
//             return images;
//         } catch (error) {
//             throw new Error('Error fetching lobby images:', error.response?.data || error.message);
//         }
//     }
// );


// export const deleteLobbyImage = createAsyncThunk(
//     'lobbyImages/deleteLobbyImage',
//     async ({ lobbyId, imageId }, thunkAPI) => {
//         try {
//             const response = await axios.delete(`${apiEndpoint}/images/${lobbyId}/${imageId}`);
//             return { lobbyId, imageId };
//         } catch (error) {
//             return thunkAPI.rejectWithValue(error.response?.data || error.message);
//         }
//     }
// );

// const adminlobbyimagesSlice = createSlice({
//     name: "lobbyImages",
//     initialState: {
//         images: [],
//         status: "idle",
//         error: null,
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//         .addCase(fetchLobbyImages.pending, (state) => {
//             state.status = "loading";
//         })
//         .addCase(fetchLobbyImages.fulfilled, (state, action) => {
//             state.status = "succeeded";
//             state.images = action.payload;
//         })
//         .addCase(fetchLobbyImages.rejected, (state, action) => {
//             state.status = "failed";
//             state.error = action.error.message;
//         })

//         .addCase(deleteLobbyImage.pending, (state) => {
//             state.status = 'loading';
//         })
//         .addCase(deleteLobbyImage.fulfilled, (state, action) => {
//             state.status = 'succeeded';
//             state.images = state.images.filter(image => image.id !== action.payload.imageId);
//         })
//         .addCase(deleteLobbyImage.rejected, (state, action) => {
//             state.status = 'failed';
//             state.error = action.error.message || 'Error deleting lobby image';
//         });
//     },
// });

// export default adminlobbyimagesSlice.reducer;

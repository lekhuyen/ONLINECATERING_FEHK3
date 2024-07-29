import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Lobby";

// Async thunk to fetch lobby data
export const fetchLobbyData = createAsyncThunk(
    "lobby/fetchLobbyData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values;
        } catch (error) {
            throw new Error('Error fetching lobby data:', error.response?.data || error.message);
        }
    }
);

// Async thunk to create new lobby item
export const createLobbyItem = createAsyncThunk(
    "lobby/createLobbyItem",
    async (createLobbyItem) => {
        try {
            const response = await axios.post(apiEndpoint, createLobbyItem, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating lobby item:', error.response?.data || error.message);
        }
    }
);

// Async thunk to update lobby item

export const updateLobbyItem = createAsyncThunk(
    "lobby/updateLobbyItem",
    async ({ id, lobbyName, description, area, type, price }) => {
        try {
            const response = await axios.put(`${apiEndpoint}/${id}`, {
                id: Number(id),
                lobbyName,
                description,
                area,
                type: parseInt(type, 10), // Convert to integer if necessary
                price: parseFloat(price) // Convert to float
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error updating lobby item:', error.response?.data || error.message);
        }
    }
);


// Async thunk to delete lobby item
export const deleteLobbyItem = createAsyncThunk(
    "lobby/deleteLobbyItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting lobby item:', error.response?.data || error.message);
        }
    }
);

const adminlobbySlice = createSlice({
    name: "lobby",
    initialState: {
        items: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLobbyData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchLobbyData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchLobbyData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createLobbyItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createLobbyItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createLobbyItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateLobbyItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateLobbyItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateLobbyItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteLobbyItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteLobbyItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteLobbyItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default adminlobbySlice.reducer;

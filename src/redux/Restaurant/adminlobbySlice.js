import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiEndpoint = "http://localhost:5265/api/Lobby";

export const fetchLobbies = createAsyncThunk('adminLobby/fetchLobbies', async () => {
    const response = await axios.get(apiEndpoint);
    return response.data.data.$values;
});

export const fetchLobbyById = createAsyncThunk('adminLobby/fetchLobbyById', async (id) => {
    const response = await axios.get(`${apiEndpoint}/${id}`);
    return response.data;
});

export const createLobby = createAsyncThunk('adminLobby/createLobby', async (formData) => {
    const response = await axios.post(apiEndpoint, formData, {
        headers: {
            'Content-Type': 'multipart/form-data' // Ensure the correct header is set
        }
    });
    return response.data;
});

export const updateLobby = createAsyncThunk('adminLobby/updateLobby', async ({ id, lobbyName, description, area, type, price, formFile }) => {
    try {
        const formData = new FormData();
        formData.append("id", id); // Include ID if backend expects it
        formData.append("lobbyName", lobbyName);
        formData.append("description", description);
        formData.append("area", area);
        formData.append("type", type);
        formData.append("price", price);

        if (formFile) {
            formData.append("formFile", formFile);
        }

        const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data;
    } catch (error) {
        throw new Error("Error updating lobby:", error.response.data);
    }
});


export const deleteLobby = createAsyncThunk('adminLobby/deleteLobby', async (id) => {
    await axios.delete(`${apiEndpoint}/${id}`);
    return id;
});

const adminlobbySlice = createSlice({
    name: 'adminLobby',
    initialState: {
        lobbies: [],  // Make sure this is an array
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLobbies.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLobbies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.lobbies = action.payload;
            })
            .addCase(fetchLobbies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchLobbyById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchLobbyById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.lobbies.findIndex(lobby => lobby.id === action.payload.id);
                if (index >= 0) {
                    state.lobbies[index] = action.payload;
                } else {
                    state.lobbies.push(action.payload);
                }
            })
            .addCase(fetchLobbyById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createLobby.fulfilled, (state, action) => {
                state.lobbies.push(action.payload);
            })
            .addCase(updateLobby.fulfilled, (state, action) => {
                const index = state.lobbies.findIndex(lobby => lobby.id === action.payload.id);
                state.lobbies[index] = action.payload;
            })
            .addCase(deleteLobby.fulfilled, (state, action) => {
                state.lobbies = state.lobbies.filter(lobby => lobby.id !== action.payload);
            });
    },
});

export default adminlobbySlice.reducer;

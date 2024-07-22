import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAboutTypes = createAsyncThunk('aboutTypes/fetchAboutTypes', async () => {
    const response = await axios.get('http://localhost:5034/api/About/abouttypes'); // Adjust the URL to match your API endpoint 
    return response.data.data;
});

export const createAboutType = createAsyncThunk('aboutTypes/createAboutType', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5034/api/About/abouttypes', data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const updateAboutType = createAsyncThunk(
    'aboutTypes/updateAboutType',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5034/api/About/abouttypes/${id}`, data);
            return response.data.data;
        } catch (error) {
            // Log the error message to understand the issue
            console.error('Failed to edit About Type:', error.message);
            return rejectWithValue(error.response.data); // Provide the error details to the reducer
        }
    }
);


export const deleteAboutType = createAsyncThunk('aboutTypes/deleteAboutType', async (id, { rejectWithValue }) => {
    try {
        await axios.delete(`http://localhost:5034/api/About/abouttypes/${id}`);
        return id;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

const aboutTypeSlice = createSlice({
    name: 'aboutTypes',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAboutTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchAboutTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(createAboutType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAboutType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createAboutType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(updateAboutType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(updateAboutType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedItem = action.payload;
                const index = state.items.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.items[index] = updatedItem;
                }
            })
            .addCase(updateAboutType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : 'Failed to edit About Type'; // Set a default message or use the server-provided message
            })
            .addCase(deleteAboutType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteAboutType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAboutType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default aboutTypeSlice.reducer;

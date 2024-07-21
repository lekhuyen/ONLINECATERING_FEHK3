import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAboutTypes = createAsyncThunk('aboutTypes/fetchAboutTypes', async () => {
    const response = await axios.get('http://localhost:5034/api/About/abouttypes'); // Adjust the URL to match your API endpoint
    return response.data.data;
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
            });
    }
});

export default aboutTypeSlice.reducer;

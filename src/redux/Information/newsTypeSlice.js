import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const fetchNewsTypes = createAsyncThunk('aboutTypes/fetchNewsTypes', async () => {
    const response = await axios.get('http://localhost:5034/api/News/newtypes'); // Adjust the URL to match your API endpoint
    return response.data.data;
});

const newsTypeSlice = createSlice({
    name: 'newsTypes',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchNewsTypes.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchNewsTypes.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchNewsTypes.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default newsTypeSlice.reducer;


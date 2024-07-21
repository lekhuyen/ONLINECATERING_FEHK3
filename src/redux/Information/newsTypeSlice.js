import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNewsTypes = createAsyncThunk('newsTypes/fetchNewsTypes', async () => {
    const response = await axios.get('http://localhost:5034/api/News/newtypes'); // Adjust the URL to match your API endpoint
    return response.data.data;
});

export const createNewsType = createAsyncThunk('newsTypes/createNewsType', async (data, { rejectWithValue }) => {
    try {
        const response = await axios.post('http://localhost:5034/api/News/newtypes', data);
        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});

export const editNewsType = createAsyncThunk(
    'newsTypes/editNewsType',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axios.put(`http://localhost:5034/api/News/newtypes/${id}`, data);
            return response.data.data;
        } catch (error) {
            // Log the error message to understand the issue
            console.error('Failed to edit News Type:', error.message);
            return rejectWithValue(error.response.data); // Provide the error details to the reducer
        }
    }
);

export const deleteNewsType = createAsyncThunk('newsTypes/deleteNewsType', async (id) => {
    await axios.delete(`http://localhost:5034/api/News/newtypes/${id}`);
    return id;
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
            })

            .addCase(createNewsType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createNewsType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items.push(action.payload);
            })
            .addCase(createNewsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })

            .addCase(editNewsType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editNewsType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const updatedItem = action.payload;
                const index = state.items.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.items[index] = updatedItem;
                }
            })
            .addCase(editNewsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload ? action.payload.message : 'Failed to edit About Type'; // Set a default message or use the server-provided message
            })

            .addCase(deleteNewsType.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteNewsType.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteNewsType.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });

    }
});

export default newsTypeSlice.reducer;

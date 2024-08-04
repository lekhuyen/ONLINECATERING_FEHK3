import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Comment";

export const fetchCommentData = createAsyncThunk(
    "admincomment/fetchCommentData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.$values; // Adjust to match your API response structure
        } catch (error) {
            throw new Error('Error fetching comment data:', error.response?.data || error.message);
        }
    }
);

export const toggleCommentStatus = createAsyncThunk(
    "admincomment/toggleCommentStatus",
    async ({ id, status }) => {
        try {
            const response = await axios.put(`${apiEndpoint}/toggleStatus/${id}`, { status });
            return response.data.data; // Adjust according to your API response structure
        } catch (error) {
            throw new Error('Error toggling comment status:', error.response?.data || error.message);
        }
    }
);

export const deleteAdminComment = createAsyncThunk(
    "admincomment/deleteComment",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id;
        } catch (error) {
            throw new Error('Error deleting comment:', error.response?.data || error.message);
        }
    }
);

const admincommentSlice = createSlice({
    name: "admincomment",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCommentData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchCommentData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload || [];
            })
            .addCase(fetchCommentData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(toggleCommentStatus.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? { ...item, status: action.payload.status } : item
                );
            })
            .addCase(toggleCommentStatus.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAdminComment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAdminComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAdminComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default admincommentSlice.reducer;


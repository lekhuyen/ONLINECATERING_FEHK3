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

export const createAdminComment = createAsyncThunk(
    "admincomment/createComment",
    async (newComment) => {
        try {
            const response = await axios.post(apiEndpoint, newComment);
            return response.data.data; // Adjust according to your API response structure
        } catch (error) {
            throw new Error('Error creating comment:', error.response?.data || error.message);
        }
    }
);

export const updateAdminComment = createAsyncThunk(
    "admincomment/updateComment",
    async (updatedComment) => {
        try {
            const { id, ...rest } = updatedComment;
            const response = await axios.put(`${apiEndpoint}/${id}`, rest);
            return response.data.data; // Adjust according to your API response structure
        } catch (error) {
            throw new Error('Error updating comment:', error.response?.data || error.message);
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
            .addCase(createAdminComment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAdminComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createAdminComment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateAdminComment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAdminComment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateAdminComment.rejected, (state, action) => {
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


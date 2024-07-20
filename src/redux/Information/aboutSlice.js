import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5034/api/About";

// Async thunk to fetch about data
export const fetchAboutData = createAsyncThunk(
    "about/fetchAboutData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data;
        } catch (error) {
            throw new Error('Error fetching about data:', error);
        }
    }
);

// Async thunk to create new about item
export const createAboutUsItem = createAsyncThunk(
    "about/createAboutUsItem",
    async (newAboutItem) => {
        try {
            const formData = new FormData();
            formData.append('title', newAboutItem.title);
            formData.append('content', newAboutItem.content);
            if (newAboutItem.imageFiles) {
                newAboutItem.imageFiles.forEach(file => {
                    formData.append('imageFiles', file);
                });
            }

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating about item:', error);
        }
    }
);

// Async thunk to update about item
export const updateAboutItem = createAsyncThunk(
    "about/updateAboutItem",
    async ({ id, title, content, imageFiles, imagePaths }) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("title", title);
            formData.append("content", content);

            if (imageFiles && imageFiles.length > 0) {
                for (let i = 0; i < imageFiles.length; i++) {
                    formData.append("imageFiles", imageFiles[i]);
                }
            }

            if (imagePaths && imagePaths.length > 0) {
                formData.append("imagePaths", JSON.stringify(imagePaths));
            }

            const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data.data;
        } catch (error) {
            throw new Error("Error updating about item:", error);
        }
    }
);

// Async thunk to delete about item
export const deleteAboutItem = createAsyncThunk(
    "about/deleteAboutItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting about item:', error.response.data);
        }
    }
);

const aboutSlice = createSlice({
    name: "about",
    initialState: {
        items: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAboutData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchAboutData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = Array.isArray(action.payload) ? action.payload : [];
            })
            .addCase(fetchAboutData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createAboutUsItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createAboutUsItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload);
            })
            .addCase(createAboutUsItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateAboutItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateAboutItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateAboutItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteAboutItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteAboutItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteAboutItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default aboutSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5034/api/News";

// Async thunk to fetch news data
export const fetchNewsData = createAsyncThunk(
  "news/fetchNewsData",
  async () => {
    try {
      const response = await axios.get(apiEndpoint);
      return response.data.data;
    } catch (error) {
      throw new Error('Error fetching news data:', error.response.data);
    }
  }
);

// Async thunk to create a new news item
export const createNewsItem = createAsyncThunk(
  "news/createNewsItem",
  async (newNewsItem) => {
    try {
      const formData = new FormData();
      formData.append('title', newNewsItem.title);
      formData.append('content', newNewsItem.content);
      formData.append('newsTypeId', newNewsItem.newsTypeId);
      if (newNewsItem.imageFile) {
        formData.append('imageFile', newNewsItem.imageFile);
      }

      const response = await axios.post(apiEndpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error('Error creating news item:', error.response.data);
    }
  }
);

// Async thunk to update a news item
export const updateNewsItem = createAsyncThunk(
  "news/updateNewsItem",
  async ({ id, formData }) => {
    try {
      const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error('Error updating news item:', error.response.data);
    }
  }
);

// Async thunk to delete a news item
export const deleteNewsItem = createAsyncThunk(
  "news/deleteNewsItem",
  async (id) => {
    try {
      await axios.delete(`${apiEndpoint}/${id}`);
      return id;
    } catch (error) {
      throw new Error('Error deleting news item:', error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    items: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNewsData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchNewsData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(createNewsItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createNewsItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items.push(action.payload);
      })
      .addCase(createNewsItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(updateNewsItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateNewsItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(updateNewsItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(deleteNewsItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteNewsItem.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      .addCase(deleteNewsItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;

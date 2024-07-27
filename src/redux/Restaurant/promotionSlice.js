import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Promotion";

// Async thunk to fetch promotion data
export const fetchPromotionData = createAsyncThunk(
    "promotion/fetchPromotionData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data;
        } catch (error) {
            throw new Error('Error fetching promotion data:', error.response.data);
        }
    }
);

// Async thunk to create new promotion
export const createPromotionItem = createAsyncThunk(
    "promotion/createPromotionItem",
    async (newPromotion) => {
        try {
            const formData = new FormData();
            formData.append('name', newPromotion.name);
            formData.append('description', newPromotion.description);
            formData.append('status', newPromotion.status);
            formData.append('quantityTable', newPromotion.quantityTable);
            formData.append('price', newPromotion.price);
            if (newPromotion.imageFile) {
                formData.append('imageFile', newPromotion.imageFile);
            }

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data;
        } catch (error) {
            throw new Error('Error creating promotion:', error.response.data);
        }
    }
);

// Async thunk to update promotion
export const updatePromotionItem = createAsyncThunk(
    "promotion/updatePromotionItem",
    async (updatedPromotion) => {
        try {
            const formData = new FormData();
            formData.append("id", updatedPromotion.id);
            formData.append("name", updatedPromotion.name);
            formData.append("description", updatedPromotion.description);
            formData.append("status", updatedPromotion.status);
            formData.append("quantityTable", updatedPromotion.quantityTable);
            formData.append("price", updatedPromotion.price);
            if (updatedPromotion.imageFile) {
                formData.append('imageFile', updatedPromotion.imageFile);
            }

            const response = await axios.put(`${apiEndpoint}/${updatedPromotion.id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data;
        } catch (error) {
            throw new Error("Error updating promotion:", error.response.data);
        }
    }
);

// Async thunk to delete promotion
export const deletePromotionItem = createAsyncThunk(
    "promotion/deletePromotionItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted promotion ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting promotion:', error.response.data);
        }
    }
);

const promotionSlice = createSlice({
    name: "promotion",
    initialState: {
        promotions: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPromotionData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPromotionData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.promotions = action.payload.data || [];
            })
            .addCase(fetchPromotionData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createPromotionItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPromotionItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.promotions.push(action.payload.data);
            })
            .addCase(createPromotionItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updatePromotionItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePromotionItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.promotions = state.promotions.map(promotion =>
                    promotion.id === action.payload.data.id ? action.payload.data : promotion
                );
            })
            .addCase(updatePromotionItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deletePromotionItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePromotionItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.promotions = state.promotions.filter(promotion => promotion.id !== action.payload);
            })
            .addCase(deletePromotionItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default promotionSlice.reducer;

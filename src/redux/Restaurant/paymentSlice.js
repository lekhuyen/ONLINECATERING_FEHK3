import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Payment";

// Async thunk to fetch payment data
export const fetchPaymentData = createAsyncThunk(
    "payment/fetchPaymentData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data;
        } catch (error) {
            throw new Error('Error fetching payment data:', error.response.data);
        }
    }
);

// Async thunk to create new payment
export const createPayment = createAsyncThunk(
    "payment/createPayment",
    async (newPayment) => {
        try {
            const response = await axios.post(apiEndpoint, newPayment);
            return response.data.data;
        } catch (error) {
            throw new Error('Error creating payment:', error.response.data);
        }
    }
);

// Async thunk to update payment
export const updatePayment = createAsyncThunk(
    "payment/updatePayment",
    async (updatedPayment) => {
        try {
            const response = await axios.put(`${apiEndpoint}/${updatedPayment.id}`, updatedPayment);
            return response.data.data;
        } catch (error) {
            throw new Error('Error updating payment:', error.response.data);
        }
    }
);

// Async thunk to delete payment
export const deletePayment = createAsyncThunk(
    "payment/deletePayment",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted payment ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting payment:', error.response.data);
        }
    }
);

const paymentSlice = createSlice({
    name: "payment",
    initialState: {
        payments: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPaymentData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchPaymentData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.payments = action.payload.data || [];
            })
            .addCase(fetchPaymentData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createPayment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createPayment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.payments.push(action.payload.data);
            })
            .addCase(createPayment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updatePayment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updatePayment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.payments = state.payments.map(payment =>
                    payment.id === action.payload.data.id ? action.payload.data : payment
                );
            })
            .addCase(updatePayment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deletePayment.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deletePayment.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.payments = state.payments.filter(payment => payment.id !== action.payload);
            })
            .addCase(deletePayment.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default paymentSlice.reducer;

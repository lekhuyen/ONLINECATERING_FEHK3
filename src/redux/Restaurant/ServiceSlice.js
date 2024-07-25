import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5265/api/Service";

// Async thunk to fetch service data
export const fetchServiceData = createAsyncThunk(
    "Service/fetchServiceData",
    async () => {
        try {
            const response = await axios.get(apiEndpoint);
            return response.data.data.$values; // Ensure correct data extraction
        } catch (error) {
            throw new Error('Error fetching Service data:', error.response.data);
        }
    }
);

export const createServiceItem = createAsyncThunk(
    "service/createServiceItem",
    async ({ name, description, formFile }) => { // Destructure the payload object
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('description', description);
            formData.append('formFile', formFile); // Append formFile correctly

            const response = await axios.post(apiEndpoint, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            return response.data.data;
        } catch (error) {
            throw new Error('Error creating service item:', error);
        }
    }
);


// Async thunk to update service item
export const updateServiceItem = createAsyncThunk(
    "service/updateServiceItem",
    async ({ id, name, description, imagePath, formFile }) => {
        try {
            const formData = new FormData();
            formData.append("id", id);
            formData.append("name", name);
            formData.append("description", description);
            if (formFile && formFile.length > 0) {
                for (let i = 0; i < formFile.length; i++) {
                    formData.append("formFile", formFile[i]);
                }
            }

            if (imagePath && imagePath.length > 0) {
                formData.append("imagePath", JSON.stringify(imagePath));
            }

            const response = await axios.put(`${apiEndpoint}/${id}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            return response.data.data;
        } catch (error) {
            throw new Error("Error updating service item:", error);
        }
    }
);

// Async thunk to delete service item
export const deleteServiceItem = createAsyncThunk(
    "service/deleteServiceItem",
    async (id) => {
        try {
            await axios.delete(`${apiEndpoint}/${id}`);
            return id; // Return the deleted item ID for Redux state update
        } catch (error) {
            throw new Error('Error deleting service item:', error.response.data);
        }
    }
);

const ServiceSlice = createSlice({
    name: "service",
    initialState: {
        items: [], 
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchServiceData.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchServiceData.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = action.payload; // Ensure payload assignment is correct
            })
            .addCase(fetchServiceData.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(createServiceItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(createServiceItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items.push(action.payload); 
            })
            .addCase(createServiceItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(updateServiceItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateServiceItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.map(item =>
                    item.id === action.payload.id ? action.payload : item
                );
            })
            .addCase(updateServiceItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteServiceItem.pending, (state) => {
                state.status = "loading";
            })
            .addCase(deleteServiceItem.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteServiceItem.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});

export default ServiceSlice.reducer;

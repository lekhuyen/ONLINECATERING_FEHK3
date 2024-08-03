import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiEndpoint = "http://localhost:5044/api/User";

// Async thunk to fetch accounts data
export const fetchAccountsData = createAsyncThunk(
    "accounts/fetchAccountsData",
    async () => {
        try {
        const response = await axios.get(apiEndpoint);
        return response.data.data; // Assuming response.data directly contains the array of users
        } catch (error) {
        throw new Error('Error fetching accounts data:', error.response.data);
        }
    }
    );

    // Async thunk to create a user
    export const createAccount = createAsyncThunk(
    "accounts/createAccount",
    async (newAccount) => {
        try {
        const response = await axios.post(apiEndpoint, newAccount);
        return response.data.data; // Assuming response.data contains the newly created user
        } catch (error) {
        throw new Error('Error creating account:', error.response.data);
        }
    }
    );

    // Async thunk to update a user
    export const updateAccount = createAsyncThunk(
    "accounts/updateAccount",
    async (updatedAccount) => {
        const { id, ...accountWithoutId } = updatedAccount;
        try {
        const response = await axios.put(`${apiEndpoint}/${id}`, accountWithoutId);
        return response.data.data; // Assuming response.data contains the updated user
        } catch (error) {
        throw new Error('Error updating account:', error.response.data);
        }
    }
    );

    // Async thunk to delete a user
    export const deleteAccount = createAsyncThunk(
    "accounts/deleteAccount",
    async (id) => {
        try {
        await axios.delete(`${apiEndpoint}/${id}`);
        return id; // Return the deleted user ID for Redux state update
        } catch (error) {
        throw new Error('Error deleting account:', error.response.data);
        }
    }
    );

    export const editUserStatus = createAsyncThunk(
        "accounts/editUserStatus",
        async ({ id, newStatus }) => {
            try {
                const response = await axios.put(`${apiEndpoint}/admin-edit/${id}?userId=${id}&newStatus=${newStatus}`);
                console.log('API Response:', response.data); // Log the response for debugging
                return response.data; // Assuming response.data contains the updated user object
            } catch (error) {
                console.error('Error editing user status:', error);
                throw new Error('Error editing user status:', error.response.data);
            }
        }
    );

    const accountsSlice = createSlice({
    name: 'accounts',
    initialState: {
        items: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchAccountsData.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchAccountsData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = action.payload;
        })
        .addCase(fetchAccountsData.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(createAccount.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(createAccount.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items.push(action.payload);
        })
        .addCase(createAccount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(updateAccount.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(updateAccount.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const updatedAccount = action.payload;
            const index = state.items.findIndex(account => account.id === updatedAccount.id);
            if (index !== -1) {
            state.items[index] = updatedAccount;
            }
        })
        .addCase(updateAccount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(deleteAccount.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(deleteAccount.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.items = state.items.filter(account => account.id !== action.payload);
        })
        .addCase(deleteAccount.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })

        .addCase(editUserStatus.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(editUserStatus.fulfilled, (state, action) => {
            state.status = 'succeeded';
            const updatedAccount = action.payload;
            const index = state.items.findIndex(account => account.id === updatedAccount.id);
            if (index !== -1) {
                state.items[index].status = updatedAccount.status;
            }
        })
        .addCase(editUserStatus.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
    }
});

export default accountsSlice.reducer;

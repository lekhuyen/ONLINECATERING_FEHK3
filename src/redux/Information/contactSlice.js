import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

    export const fetchContacts = createAsyncThunk("contacts/fetchContacts", async () => {
    const response = await axios.get("http://localhost:5034/api/Contact");
    return response.data.data;
    });

    export const createContact = createAsyncThunk(
        "contacts/createContact",
        async (newContact) => {
            try {
                const response = await axios.post("http://localhost:5034/api/Contact", newContact);
                return response.data.data; // Assuming your backend returns the created contact data
            } catch (error) {
                if (error.response && error.response.status === 400 && error.response.data.errors) {
                const validationErrors = error.response.data.errors;
                console.log("Validation Errors:", validationErrors);
                // Handle validation errors, e.g., dispatch(setValidationErrors(validationErrors));
                }
                console.error("Error creating contact:", error);
                throw error; // Rethrow the error to be caught by Redux
            }
            }
        );
    

        export const respondToContact = createAsyncThunk(
            "contacts/respondToContact",
            async ({ id, response }) => {
                try {
                    const result = await axios.post(
                        `http://localhost:5034/api/contact/respond/${id}`,
                        { response }
                    );
                    return result.data.data;
                } catch (error) {
                    console.error("Error responding to contact:", error);
                    throw error.response?.data || { message: "Unknown error occurred" };
                }
            }
        );
        

    export const deleteContact = createAsyncThunk("contacts/deleteContact", async (id) => {
    await axios.delete(`http://localhost:5034/api/Contact/${id}`);
    return id;
    });

    const contactSlice = createSlice({
    name: "contacts",
    initialState: {
        items: [],
        status: "idle",
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchContacts.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items = action.payload;
        })
        .addCase(fetchContacts.pending, (state) => {
            state.status = "loading";
        })
        .addCase(fetchContacts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })

        .addCase(createContact.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.items.push(action.payload); // Add the new contact to the state
        })

        .addCase(createContact.pending, (state) => {
            state.status = "loading";
        })

        .addCase(createContact.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        })
    

        // Handle respondToContact actions
        .addCase(respondToContact.pending, (state) => {
            state.status = "loading";
            })
            .addCase(respondToContact.fulfilled, (state, action) => {
                const index = state.items.findIndex(
                (contact) => contact.id === action.payload.id
                );
                if (index !== -1) {
                state.items[index].response = action.payload.response;
                }
            })
            .addCase(respondToContact.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.payload ? action.payload.message : "Unknown error occurred";
            })

            

        // Handle deleteContact actions
        .addCase(deleteContact.fulfilled, (state, action) => {
            state.items = state.items.filter(
            (contact) => contact.id !== action.payload
            ); // Remove the deleted contact from state
        });
    },
});

export default contactSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import * as actions from './userActions'
import { act } from "react";

export const userRegisterSlice = createSlice({
  name: 'user',
  initialState: {
    isRegister: false,
    registerStatus: "",
    registerMessage: "",
  },
  reducers: {
    registerLogin: (state, action) => {
      state.isRegister = action.payload
      console.log(action)
  }
  },
  extraReducers: (builders) => {
    builders.addCase(actions.sendMailRegister.pending, (state) => {
      state.isRegister = true
    })
    builders.addCase(actions.sendMailRegister.fulfilled, (state, action) => {
      state.isRegister = false
      state.registerStatus  = action.payload.status
      state.registerMessage = action.payload.message
    })
    builders.addCase(actions.sendMailRegister.rejected, (state, action) => {
      state.isRegister = true
      state.status = null
      state.message = null
    })
  }

})

export const { registerLogin  } = userRegisterSlice.actions

export default userRegisterSlice.reducer
import { createSlice } from "@reduxjs/toolkit";
import * as actions from './userActions'

export const userRegisterSlice = createSlice({
  name: 'user',
  initialState: {
    isRegister: false,
  },
  reducers: {

  },
  extraReducers: (builders) => {
    builders.addCase(actions.sendMailRegister.pending, (state) => {
      state.isRegister = true
    })
    builders.addCase(actions.sendMailRegister.fulfilled, (state, action) => {
      state.isRegister = false
    })
    builders.addCase(actions.sendMailRegister.rejected, (state, action) => {
      state.isRegister = true
    })
  }

})

export default userRegisterSlice.reducer
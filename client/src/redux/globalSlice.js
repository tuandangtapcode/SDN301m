import { createSlice } from '@reduxjs/toolkit'

const globalSlice = createSlice({
  name: 'global',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
    },
  }
})


export default globalSlice


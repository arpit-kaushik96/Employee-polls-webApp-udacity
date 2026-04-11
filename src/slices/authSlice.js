import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    authedUser: null,
    intendedPath: null,
  },
  reducers: {
    setAuthedUser: (state, action) => {
      state.authedUser = action.payload;
    },
    logout: (state) => {
      state.authedUser = null;
      state.intendedPath = null;
    },
    setIntendedPath: (state, action) => {
      state.intendedPath = action.payload;
    },
    clearIntendedPath: (state) => {
      state.intendedPath = null;
    },
  },
});

export const { setAuthedUser, logout, setIntendedPath, clearIntendedPath } = authSlice.actions;
export default authSlice.reducer;

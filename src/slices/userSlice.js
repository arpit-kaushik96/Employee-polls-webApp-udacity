import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../../_DATA';

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const data = await _getUsers();
    return data;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    entities: {},
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'idle';
        state.entities = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;

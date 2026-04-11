import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getUsers } from '../../_DATA';
import { addQuestion, answerQuestion } from './questionSlice';

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
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        // Update the user's questions array when they create a new poll
        const { author, id } = action.payload;
        if (state.entities[author]) {
          state.entities[author].questions.push(id);
        }
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        // Update the user's answers when they vote on a poll
        const { authedUser, qid, answer } = action.payload;
        if (state.entities[authedUser]) {
          state.entities[authedUser].answers[qid] = answer;
        }
      });
  },
});

export default userSlice.reducer;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { _getQuestions, _saveQuestion, _saveQuestionAnswer } from '../../_DATA';

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const data = await _getQuestions();
    return data;
  }
);

export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async (questionData) => {
    const question = await _saveQuestion(questionData);
    return question;
  }
);

export const answerQuestion = createAsyncThunk(
  'questions/answerQuestion',
  async (answerData) => {
    await _saveQuestionAnswer(answerData);
    return answerData;
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState: {
    entities: {},
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.status = 'idle';
        state.entities = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error.message;
      })
      .addCase(addQuestion.fulfilled, (state, action) => {
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(answerQuestion.fulfilled, (state, action) => {
        const { qid, answer, authedUser } = action.payload;
        if (state.entities[qid]) {
          state.entities[qid][answer].votes.push(authedUser);
        }
      });
  },
});

export default questionSlice.reducer;

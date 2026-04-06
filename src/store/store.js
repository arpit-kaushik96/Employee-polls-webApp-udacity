import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import questionReducer from '../slices/questionSlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    questions: questionReducer,
    auth: authReducer,
  },
});

export default store;

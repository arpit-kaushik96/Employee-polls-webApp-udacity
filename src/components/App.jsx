import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { fetchUsers } from '../slices/userSlice';
import { fetchQuestions } from '../slices/questionSlice';
import Navigation from './Navigation.jsx';
import Login from './Login.jsx';
import Home from './Home.jsx';
import QuestionDetail from './QuestionDetail.jsx';
import Leaderboard from './Leaderboard.jsx';
import NewPoll from './NewPoll.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import NotFound from './NotFound.jsx';
import '../styles/globals.css';

function App() {
  const dispatch = useDispatch();
  const authedUser = useSelector((state) => state.auth.authedUser);
  const usersStatus = useSelector((state) => state.users.status);
  const questionsStatus = useSelector((state) => state.questions.status);

  useEffect(() => {
    if (usersStatus === 'idle') {
      dispatch(fetchUsers());
    }
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [dispatch, usersStatus, questionsStatus]);

  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={!authedUser ? <Login /> : <Home />} />
        <Route
          path="/question/:id"
          element={
            <ProtectedRoute>
              <QuestionDetail />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute>
              <Leaderboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRoute>
              <NewPoll />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

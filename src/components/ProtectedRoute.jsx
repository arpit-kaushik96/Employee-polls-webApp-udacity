import { useSelector, useDispatch } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { setIntendedPath } from '../slices/authSlice';

function ProtectedRoute({ children }) {
  const authedUser = useSelector((state) => state.auth.authedUser);
  const location = useLocation();
  const dispatch = useDispatch();

  if (!authedUser) {
    // Store the path the user was trying to access
    dispatch(setIntendedPath(location.pathname));
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;

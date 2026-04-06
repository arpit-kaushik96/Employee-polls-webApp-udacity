import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../slices/authSlice';
import '../styles/Navigation.css';

function Navigation() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.entities);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  if (!authedUser) {
    return null;
  }

  const user = users[authedUser];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📊</span>
          Employee Polls
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/add" className="nav-link">
              New Poll
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaderboard" className="nav-link">
              Leaderboard
            </Link>
          </li>
        </ul>

        <div className="nav-user">
          <img src={user.avatarURL} alt={user.name} className="user-avatar" />
          <span className="user-name">{user.name}</span>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

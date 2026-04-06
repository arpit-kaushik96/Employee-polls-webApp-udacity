import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthedUser } from '../slices/authSlice';
import '../styles/Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.entities);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    const user = users[username];
    if (!user || user.password !== password) {
      setError('Invalid username or password');
      return;
    }

    dispatch(setAuthedUser(username));
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Employee Polls</h1>
        <p className="login-subtitle">Please login to continue</p>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <select
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control"
            >
              <option value="">Select a user</option>
              {Object.keys(users).map((userId) => (
                <option key={userId} value={userId}>
                  {users[userId].name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="form-control"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            Login
          </button>
        </form>

        <div className="demo-credentials">
          <p>Demo Credentials:</p>
          <ul>
            <li>sarah edo / password123</li>
            <li>tyler mcginnis / abc321</li>
            <li>mike tsamis / xyz123</li>
            <li>zenobia oshikanlu / pass246</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Login;

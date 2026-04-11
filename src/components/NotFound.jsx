import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-container">
      <div className="not-found-box">
        <h1>404</h1>
        <p className="not-found-message">Page Not Found</p>
        <p className="not-found-description">
          The page you're looking for doesn't exist.
        </p>
        <button onClick={() => navigate('/')} className="btn-home">
          Go to Home
        </button>
      </div>
    </div>
  );
}

export default NotFound;

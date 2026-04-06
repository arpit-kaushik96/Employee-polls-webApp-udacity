import { useSelector } from 'react-redux';
import '../styles/Leaderboard.css';

function Leaderboard() {
  const users = useSelector((state) => state.users.entities);
  const questions = useSelector((state) => state.questions.entities);

  const leaderboard = Object.values(users)
    .map((user) => {
      const answeredCount = Object.keys(user.answers).length;
      const createdCount = user.questions.length;
      const score = answeredCount + createdCount;

      return {
        ...user,
        answeredCount,
        createdCount,
        score,
      };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="leaderboard-container">
      <h1>Leaderboard</h1>
      <div className="leaderboard">
        {leaderboard.map((user, index) => (
          <div key={user.id} className="leaderboard-item">
            <div className="rank">{index + 1}</div>
            <img src={user.avatarURL} alt={user.name} className="avatar" />
            <div className="user-info">
              <h3>{user.name}</h3>
              <p className="user-id">@{user.id}</p>
            </div>
            <div className="stats">
              <div className="stat">
                <span className="stat-label">Answered</span>
                <span className="stat-value">{user.answeredCount}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Created</span>
                <span className="stat-value">{user.createdCount}</span>
              </div>
            </div>
            <div className="score">
              <span className="score-label">Score</span>
              <span className="score-value">{user.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;

import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

function Home() {
  const [activeTab, setActiveTab] = useState('unanswered');
  const questions = useSelector((state) => state.questions.entities);
  const users = useSelector((state) => state.users.entities);
  const authedUser = useSelector((state) => state.auth.authedUser);

  const userAnswers = users[authedUser]?.answers || {};
  const userQuestions = users[authedUser]?.questions || [];

  const unansweredQuestions = Object.values(questions)
    .filter((q) => !userAnswers[q.id])
    .sort((a, b) => b.timestamp - a.timestamp);

  const answeredQuestions = Object.values(questions)
    .filter((q) => userAnswers[q.id])
    .sort((a, b) => b.timestamp - a.timestamp);

  const displayQuestions = activeTab === 'unanswered' ? unansweredQuestions : answeredQuestions;

  return (
    <div className="home-container">
      <div className="questions-section">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'unanswered' ? 'active' : ''}`}
            onClick={() => setActiveTab('unanswered')}
          >
            Unanswered Questions
          </button>
          <button
            className={`tab ${activeTab === 'answered' ? 'active' : ''}`}
            onClick={() => setActiveTab('answered')}
          >
            Answered Questions
          </button>
        </div>

        <div className="questions-list">
          {displayQuestions.length === 0 ? (
            <p className="no-questions">No {activeTab} questions</p>
          ) : (
            displayQuestions.map((question) => (
              <Link
                key={question.id}
                to={`/question/${question.id}`}
                className="question-card"
              >
                <div className="question-header">
                  <img
                    src={users[question.author].avatarURL}
                    alt={users[question.author].name}
                    className="avatar"
                  />
                  <div className="question-author">
                    <p className="author-name">{users[question.author].name}</p>
                    <p className="question-time">asked {formatTime(question.timestamp)}</p>
                  </div>
                </div>
                <div className="question-body">
                  <p className="question-text">Would you rather...</p>
                  <p className="option">{question.optionOne.text}</p>
                  <p className="divider">OR</p>
                  <p className="option">{question.optionTwo.text}</p>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

function formatTime(timestamp) {
  const now = new Date();
  const questionTime = new Date(timestamp);
  const diffMs = now - questionTime;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return questionTime.toLocaleDateString();
}

export default Home;

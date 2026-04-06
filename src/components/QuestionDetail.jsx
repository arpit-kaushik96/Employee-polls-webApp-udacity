import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { answerQuestion } from '../slices/questionSlice';
import { useState } from 'react';
import '../styles/QuestionDetail.css';

function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const question = useSelector((state) => state.questions.entities[id]);
  const authedUser = useSelector((state) => state.auth.authedUser);
  const users = useSelector((state) => state.users.entities);
  const userAnswer = useSelector((state) => state.users.entities[authedUser]?.answers[id]);

  if (!question) {
    return (
      <div className="question-detail-container">
        <div className="question-not-found">
          <h2>Question not found</h2>
          <button onClick={() => navigate('/')} className="btn-back">
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const author = users[question.author];
  const optionOneVotes = question.optionOne.votes.length;
  const optionTwoVotes = question.optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const handleAnswer = (answer) => {
    if (userAnswer) {
      setError('You have already answered this question');
      return;
    }

    dispatch(
      answerQuestion({
        authedUser,
        qid: id,
        answer,
      })
    );
  };

  return (
    <div className="question-detail-container">
      <button onClick={() => navigate('/')} className="btn-back">
        ← Back
      </button>

      <div className="question-card">
        <div className="question-header">
          <img src={author.avatarURL} alt={author.name} className="avatar" />
          <div className="author-info">
            <h3>{author.name}</h3>
            <p>asked this question</p>
          </div>
        </div>

        <div className="question-content">
          <h2>Would you rather...</h2>

          <div className="options-container">
            <div className={`option-card ${userAnswer === 'optionOne' ? 'selected' : ''}`}>
              <div className="option-text">{question.optionOne.text}</div>
              {userAnswer ? (
                <div className="vote-stats">
                  <p>{optionOneVotes} votes</p>
                  <p>
                    {totalVotes > 0 ? Math.round((optionOneVotes / totalVotes) * 100) : 0}%
                  </p>
                  <div className="vote-bar">
                    <div
                      className="vote-fill"
                      style={{
                        width: totalVotes > 0 ? `${(optionOneVotes / totalVotes) * 100}%` : '0%',
                      }}
                    ></div>
                  </div>
                  {userAnswer === 'optionOne' && <span className="selected-badge">✓ Your choice</span>}
                </div>
              ) : (
                <button
                  onClick={() => handleAnswer('optionOne')}
                  className="btn-vote"
                >
                  Vote
                </button>
              )}
            </div>

            <div className="divider">OR</div>

            <div className={`option-card ${userAnswer === 'optionTwo' ? 'selected' : ''}`}>
              <div className="option-text">{question.optionTwo.text}</div>
              {userAnswer ? (
                <div className="vote-stats">
                  <p>{optionTwoVotes} votes</p>
                  <p>
                    {totalVotes > 0 ? Math.round((optionTwoVotes / totalVotes) * 100) : 0}%
                  </p>
                  <div className="vote-bar">
                    <div
                      className="vote-fill"
                      style={{
                        width: totalVotes > 0 ? `${(optionTwoVotes / totalVotes) * 100}%` : '0%',
                      }}
                    ></div>
                  </div>
                  {userAnswer === 'optionTwo' && <span className="selected-badge">✓ Your choice</span>}
                </div>
              ) : (
                <button
                  onClick={() => handleAnswer('optionTwo')}
                  className="btn-vote"
                >
                  Vote
                </button>
              )}
            </div>
          </div>

          {error && <div className="error-message">{error}</div>}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetail;

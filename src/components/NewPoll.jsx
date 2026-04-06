import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addQuestion } from '../slices/questionSlice';
import '../styles/NewPoll.css';

function NewPoll() {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authedUser = useSelector((state) => state.auth.authedUser);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!optionOne.trim() || !optionTwo.trim()) {
      setError('Both options are required');
      return;
    }

    if (optionOne.trim() === optionTwo.trim()) {
      setError('Options must be different');
      return;
    }

    try {
      await dispatch(
        addQuestion({
          optionOneText: optionOne,
          optionTwoText: optionTwo,
          author: authedUser,
        })
      ).unwrap();

      navigate('/');
    } catch (err) {
      setError('Failed to create question');
    }
  };

  return (
    <div className="new-poll-container">
      <div className="new-poll-box">
        <h1>Create New Poll</h1>
        <p className="subtitle">Complete the question: "Would you rather..."</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="optionOne">Option One</label>
            <input
              id="optionOne"
              type="text"
              value={optionOne}
              onChange={(e) => setOptionOne(e.target.value)}
              placeholder="Enter first option"
              className="form-control"
            />
          </div>

          <div className="divider-text">OR</div>

          <div className="form-group">
            <label htmlFor="optionTwo">Option Two</label>
            <input
              id="optionTwo"
              type="text"
              value={optionTwo}
              onChange={(e) => setOptionTwo(e.target.value)}
              placeholder="Enter second option"
              className="form-control"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <div className="form-actions">
            <button type="submit" className="btn-submit">
              Create Poll
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-cancel"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewPoll;

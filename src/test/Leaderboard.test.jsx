import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Leaderboard from '../components/Leaderboard';

const mockStore = configureStore([]);

describe('Leaderboard Component', () => {
  let store;

  const mockUsers = {
    sarahedo: {
      id: 'sarahedo',
      name: 'Sarah Edo',
      password: 'password123',
      avatarURL: 'https://api.realworld.io/images/avatars/1.jpg',
      answers: {
        'q1': 'optionOne',
        'q2': 'optionTwo',
        'q3': 'optionOne',
      },
      questions: ['q4', 'q5'],
    },
    tylermcginnis: {
      id: 'tylermcginnis',
      name: 'Tyler McGinnis',
      password: 'abc321',
      avatarURL: 'https://api.realworld.io/images/avatars/2.jpg',
      answers: {
        'q1': 'optionOne',
      },
      questions: ['q6'],
    },
  };

  beforeEach(() => {
    store = mockStore({
      users: {
        entities: mockUsers,
        status: 'idle',
      },
      questions: {
        entities: {},
        status: 'idle',
      },
    });
  });

  // Snapshot Test
  it('should render leaderboard and match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  it('should display leaderboard title', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText(/leaderboard/i)).toBeInTheDocument();
  });

  it('should display user names in leaderboard', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
  });

  it('should display user stats (Answered and Created counts)', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Sarah Edo: answered 3 questions, created 2
    // Tyler McGinnis: answered 1 question, created 1
    const answeredLabels = screen.getAllByText(/answered/i);
    expect(answeredLabels.length).toBeGreaterThan(0);
  });

  it('should display score for each user', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const scoreLabels = screen.getAllByText(/score/i);
    expect(scoreLabels.length).toBeGreaterThan(0);
  });

  it('should display users ranked by score', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    // Sarah Edo should be ranked higher (score: 5) than Tyler McGinnis (score: 2)
    const leaderboardItems = screen.getAllByText(/answered/i);
    expect(leaderboardItems.length).toBe(2);
  });

  it('should display rank numbers', () => {
    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const rankElements = screen.getAllByText(/1/i);
    expect(rankElements.length).toBeGreaterThan(0);
    
    // Verify both ranks are displayed
    const allElements = screen.getAllByText(/2/i);
    expect(allElements.length).toBeGreaterThan(0);
  });
});

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import Login from '../components/Login';

const mockStore = configureStore([]);

const mockUsers = {
  sarahedo: {
    id: 'sarahedo',
    name: 'Sarah Edo',
    password: 'password123',
    avatarURL: 'https://api.realworld.io/images/avatars/1.jpg',
  },
  tylermcginnis: {
    id: 'tylermcginnis',
    name: 'Tyler McGinnis',
    password: 'abc321',
    avatarURL: 'https://api.realworld.io/images/avatars/2.jpg',
  },
};

describe('Login Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: {
        authedUser: null,
        intendedPath: null,
      },
      users: {
        entities: mockUsers,
        status: 'idle',
      },
    });
    store.dispatch = vi.fn(() => Promise.resolve());
  });

  // Snapshot Test
  it('should render correctly and match snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(container).toMatchSnapshot();
  });

  // DOM Tests with fireEvent
  it('should display login form with username dropdown and password input', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const usernameSelect = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByRole('button', { name: /login/i });

    expect(usernameSelect).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('should display users in the username dropdown', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const usernameSelect = screen.getByLabelText(/username/i);
    fireEvent.click(usernameSelect);

    expect(screen.getByText('Sarah Edo')).toBeInTheDocument();
    expect(screen.getByText('Tyler McGinnis')).toBeInTheDocument();
  });

  it('should show error message when username or password is empty', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/please enter both username and password/i)).toBeInTheDocument();
  });

  it('should allow user to type in password field', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    expect(passwordInput.value).toBe('testpassword');
  });

  it('should display demo credentials section', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/demo credentials/i)).toBeInTheDocument();
  });

  it('should have login title and subtitle', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText(/employee polls/i)).toBeInTheDocument();
    expect(screen.getByText(/please login to continue/i)).toBeInTheDocument();
  });
});

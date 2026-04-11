# Employee Polls Web App

A modern React + Redux web application that allows employees to create and participate in instant polls. Users can view all available polls, vote on them, create new polls, and check the company leaderboard to see top contributors.

## Features

- **User Authentication**: Secure login system with multiple user accounts
- **Interactive Polls**: Create new polls with two options and vote on existing ones
- **Real-time Leaderboard**: Track user scores and poll creation counts
- **Protected Routes**: Secure navigation that requires authentication
- **Responsive UI**: Clean, intuitive interface built with React

## Tech Stack

- **Frontend**: React 19 + Redux Toolkit
- **Routing**: React Router v7
- **Build Tool**: Vite
- **Styling**: Custom CSS
- **State Management**: Redux with async thunks

## Installation

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Employee-polls-webApp-udacity
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure avatars** (optional)
   - Edit `_DATA.js` and update the `avatarURL` field for each user if you'd like to use custom avatar URLs

## Running the Application

### Development Mode
Start the development server with hot module replacement:
```bash
npm run dev
```
The app will be available at `http://localhost:5173`

### Production Build
Build the app for production:
```bash
npm run build
```

### Preview Production Build
Build and preview the production version:
```bash
npm start
```
The app will be available at `http://localhost:3001`

## Test Accounts

The following test accounts are available for login:

| Username | Password |
|----------|----------|
| sarahedo | password123 |
| tylermcginnis | abc321 |
| mtsamis | xyz123 |
| zoshikanlu | pass246 |

## How to Use

1. **Login**: Select a user from the login page and enter their password
2. **View Polls**: Browse all available polls on the home page
3. **Vote**: Click on any poll to view details and cast your vote (can only vote once per poll)
4. **Create Poll**: Click "New Poll" to create a new poll with two options
5. **Check Leaderboard**: View the leaderboard to see user rankings based on polls answered and created

## Application Structure

```
src/
├── components/          # React components
│   ├── App.jsx         # Main app component with routing
│   ├── Login.jsx       # Authentication page
│   ├── Home.jsx        # Main dashboard with poll list
│   ├── QuestionDetail.jsx # Individual poll detail page
│   ├── NewPoll.jsx     # Create new poll page
│   ├── Leaderboard.jsx # User rankings page
│   └── Navigation.jsx  # Navigation bar
├── slices/             # Redux slices
│   ├── authSlice.js    # Authentication state
│   ├── userSlice.js    # User data state
│   └── questionSlice.js # Poll questions state
├── store/              # Redux store configuration
└── styles/             # CSS stylesheets
```

## Data Model

The app uses a local data store (`_DATA.js`) with two main data types:

### Users
- `id`: Unique user identifier
- `name`: User's display name
- `password`: Login password
- `avatarURL`: User's avatar image URL
- `questions`: Array of poll IDs created by user
- `answers`: Object tracking user's poll votes

### Questions (Polls)
- `id`: Unique question identifier
- `author`: ID of poll creator
- `timestamp`: When the poll was created
- `optionOne`: First voting option with votes and text
- `optionTwo`: Second voting option with votes and text

## Contributing

This is a personal project submission for Udacity's React & Redux course.

## License

This project is licensed under the MIT License - see the LICENSE.txt file for details.

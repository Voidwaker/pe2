import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header';
import VenueList from './components/VenueList';
import Login from './components/Login';
import Register from './components/Register';
import { useAuth } from './hooks/useAuth';
import Profile from './pages/Profile';
import Modal from 'react-modal';

function App() {
  const { authData, logout } = useAuth();

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to Holihub!</h1>
              {authData ? (
                <div>
                  <p>Welcome, {authData.profile.name}!</p>
                  <button onClick={logout}>Logout</button>
                </div>
              ) : (
                <p>
                  Discover amazing venues. Please{' '}
                  <Link to="/login">login</Link> or{' '}
                  <Link to="/register">register</Link> to get started.
                </p>
              )}
            </div>
          }
        />
        <Route path="/venues" element={<VenueList />} />
        <Route path="/bookings" element={<h1>My Bookings</h1>} />
        <Route path="/my-venues" element={<h1>My Venues</h1>} />
        <Route path="/profile" element={<Profile />} /> {}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import VenueList from './components/VenueList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import VenueDetails from './pages/VenueDetails';
import CreateVenue from './pages/CreateVenue';
import { useAuth } from './hooks/useAuth';
import Modal from 'react-modal';

function App() {
  const { authData, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<div>Welcome to Holihub!</div>} />
        <Route path="/venues" element={<VenueList />} />
        <Route path="/bookings" element={<h1>My Bookings</h1>} />
        <Route path="/my-venues" element={<h1>My Venues</h1>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {authData && authData.profile?.venueManager && (
          <Route path="/Create-Venue" element={<CreateVenue />} />
        )}
      </Routes>
    </div>
  );
}

export default App;

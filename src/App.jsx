import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import VenueList from './components/VenueList';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './pages/Profile';
import VenueDetails from './pages/VenueDetails';
import CreateVenue from './pages/CreateVenue';
import MyVenues from './pages/MyVenues';
import EditVenue from './pages/EditVenue';
import EditProfile from './pages/EditProfile';
import HomePage from './pages/HomePage'; 
import { useAuth } from './hooks/useAuth';
import Modal from 'react-modal';

function App() {
  const { authData } = useAuth();
  const navigate = useNavigate();
  const [refreshHeader, setRefreshHeader] = useState(false);

  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  useEffect(() => {
    setRefreshHeader((prev) => !prev);
  }, [authData]);

  return (
    <div>
      <Header key={refreshHeader} />
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/venues" element={<VenueList />} />
        <Route path="/bookings" element={<h1>My Bookings</h1>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/venue/:id" element={<VenueDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-venue" element={<CreateVenue />} />
        <Route path="/my-venues" element={<MyVenues />} />
        <Route path="/edit-venue/:id" element={<EditVenue />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
    </div>
  );
}

export default App;

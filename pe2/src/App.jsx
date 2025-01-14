import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import VenueList from './components/VenueList';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Welcome to Holihub!</h1>} />
        <Route path="/venues" element={<VenueList />} /> {}
        <Route path="/bookings" element={<h1>My Bookings</h1>} />
        <Route path="/my-venues" element={<h1>My Venues</h1>} />
        <Route path="/profile" element={<h1>Profile Page</h1>} />
        <Route path="/login" element={<h1>Login/Register</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/global.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Importer Router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router> {/* Pakk appen inn i Router */}
      <App />
    </Router>
  </StrictMode>
);

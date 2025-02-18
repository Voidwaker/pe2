import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';

/**
 * Login component that allows users to authenticate by providing
 * their email and password. Displays error messages for incorrect login attempts
 * and navigates the user to the profile page upon successful login.
 *
 * @component
 * @returns {JSX.Element} The login form.
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles form submission for user login.
   * Calls the API and updates state based on the response.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginUser({ email, password });
      navigate('/profile');
    } catch (err) {
      setError('Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      {loading && <p>Logging in...</p>}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;


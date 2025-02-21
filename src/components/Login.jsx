import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";

/**
 * Login Component
 *
 * Allows users to authenticate by providing their email and password.
 * Displays error messages for incorrect login attempts and redirects the user upon success.
 * A temporary solution has been added to refresh the page after login to ensure the header updates dynamically.
 *
 * @component
 * @returns {JSX.Element} The login form.
 */
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /**
   * Handles form submission for user login.
   * Calls the API and updates state based on the response.
   * A temporary refresh solution is included to ensure the header updates properly.
   *
   * @param {React.FormEvent} event - The form submission event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await loginUser({ email, password });
      navigate("/profile");

      // 🚀 Temporary solution: Refresh after login to update the header, might be fixed later if i got time for it.
      setTimeout(() => {
        window.location.reload();
      }, 500);
      
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-90 mb-4 mt-4">
      <div className="container" style={{ maxWidth: "400px" }}>
        <div className="card shadow p-4">
          <h2 className="text-center mb-4">Login</h2>
          {error && <div className="alert alert-danger text-center">{error}</div>}
          <form onSubmit={handleSubmit}>
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

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;


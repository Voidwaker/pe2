import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/auth";

/**
 * Register Component
 * 
 * Allows new users to register with a name, email, password, and an optional avatar URL.
 * Users can also opt to register as a Venue Manager.
 *
 * This component includes email validation to ensure that only users with 
 * `@noroff.no` or `@stud.noroff.no` email addresses can register.
 * After successful registration, the user is automatically logged in.
 *
 * @component
 */
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [venueManager, setVenueManager] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  /**
   * Validates the email format to allow only @noroff.no or @stud.noroff.no domains.
   *
   * @param {string} email - The email entered by the user.
   * @returns {boolean} True if the email is valid, otherwise false.
   */
  const isValidNoroffEmail = (email) => {
    return /@noroff\.no$|@stud\.noroff\.no$/i.test(email);
  };

  /**
   * Handles form submission, validating passwords and registering the user.
   * If registration is successful, the user is automatically logged in and the page refreshes.
   *
   * @param {React.FormEvent<HTMLFormElement>} event - The form submit event.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!isValidNoroffEmail(email)) {
      setError("Only @noroff.no or @stud.noroff.no emails are allowed.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const userData = {
      name,
      email,
      password,
      venueManager,
      avatar: avatarUrl || undefined,
    };

    try {
      await registerUser(userData);
      await loginUser({ email, password }); // Automatically log the user in after registration
      navigate("/profile");
      window.location.reload(); // Refresh the page to update the header
    } catch (err) {
      setError(err.message || "Failed to register. Please try again.");
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "500px" }}>
      <h2 className="text-center mb-4">Register</h2>

      {error && <div className="alert alert-danger text-center">{error}</div>}

      <form onSubmit={handleSubmit} className="p-4 border rounded shadow bg-white">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

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

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            className="form-control"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="avatarUrl" className="form-label">Avatar URL (optional)</label>
          <input
            type="url"
            id="avatarUrl"
            className="form-control"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="venueManager"
            className="form-check-input"
            checked={venueManager}
            onChange={() => setVenueManager(!venueManager)}
          />
          <label htmlFor="venueManager" className="form-check-label">I want to be a Venue Manager</label>
        </div>

        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
};

export default Register;


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Login() {
  const { login } = useApp();
  const navigate = useNavigate();

  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (!uid.trim() || !password) {
      setError("Please enter both UID and password.");
      return;
    }

    const result = login(uid, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-mark">AP</div>
        <h1>Activity Points</h1>
        <p className="login-subtitle">Sign in with your student UID to view your record.</p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="uid">UID</label>
            <input
              id="uid"
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="e.g. RJC2024001"
              autoComplete="username"
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          {error && <p className="form-message error">{error}</p>}

          <button type="submit" className="btn-primary">
            Log In
          </button>
        </form>

        <div className="login-sample">
          <p>Sample login:</p>
          <p>
            <strong>UID:</strong> RJC2024001 &nbsp; <strong>Password:</strong> pass123
          </p>
        </div>
      </div>
    </div>
  );
}

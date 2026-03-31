import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/Dashboard";

  const params = new URLSearchParams(window.location.search);
  const justVerified = params.get("verified") === "true";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        formData
      );
      login(response.data.user, response.data.token);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-content">
          <div className="auth-brand-mark">L</div>
          <h2 className="auth-tagline">
            Knowledge that
            <br />
            moves with you.
          </h2>
          <div className="auth-visual-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <div className="auth-form-wrapper">
          <div className="auth-header">
            <p className="auth-label">Welcome back</p>
            <h1 className="auth-title">Sign in</h1>
          </div>

          {/* Email verified success message */}
          {justVerified && (
            <div
              style={{
                background: "var(--green-dim)",
                border: "1px solid rgba(52,211,153,0.2)",
                color: "var(--green)",
                padding: "12px 14px",
                borderRadius: "var(--radius-sm)",
                fontSize: "13px",
                marginBottom: "1rem",
                textAlign: "center",
                fontWeight: "500",
              }}
            >
              Email verified successfully. You can now sign in.
            </div>
          )}

          {error && (
            <div className="auth-error">
              <span className="auth-error-icon">!</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-field">
              <label className="auth-field-label">Email address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                placeholder="you@example.com"
                required
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-field-label">Password</label>
              <div className="auth-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="auth-input"
                  placeholder="Your password"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="auth-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="auth-submit" disabled={isLoading}>
              {isLoading ? (
                <span className="auth-btn-loading">
                  <span className="auth-btn-spinner" /> Signing in...
                </span>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <p className="auth-switch">
            Don&apos;t have an account?{" "}
            <Link to="/Signup" className="auth-link">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;

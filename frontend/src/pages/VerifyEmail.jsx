import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [status, setStatus] = useState("verifying");
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      setStatus("invalid");
      return;
    }

    // Backend handles redirect, so this page only shows if
    // someone navigates here directly without a token
    setStatus("invalid");
  }, []);

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "2.5rem",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          boxShadow: "var(--glow-hover)",
        }}
      >
        {status === "verifying" && (
          <>
            <div style={{ fontSize: "40px", marginBottom: "1rem" }}>...</div>
            <h2 style={{ fontSize: "18px", fontWeight: "700" }}>
              Verifying your email
            </h2>
          </>
        )}
        {status === "invalid" && (
          <>
            <div style={{ fontSize: "40px", marginBottom: "1rem" }}>!</div>
            <h2
              style={{
                fontSize: "18px",
                fontWeight: "700",
                marginBottom: "0.5rem",
              }}
            >
              Invalid verification link
            </h2>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                marginBottom: "1.5rem",
              }}
            >
              This link is invalid or has already been used.
            </p>
            <button
              className="btn btn-gradient"
              style={{ width: "100%" }}
              onClick={() => navigate("/Signin")}
            >
              Go to Sign In
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;

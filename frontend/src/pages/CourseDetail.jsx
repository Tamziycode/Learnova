import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const difficultyColor = (level) => {
  if (!level) return "badge-purple";
  const l = level.toLowerCase();
  if (l === "beginner") return "badge-teal";
  if (l === "intermediate") return "badge-amber";
  return "badge-pink";
};

const getYouTubeId = (url) => {
  if (!url) return null;
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
};

const YouTubeEmbed = ({ url }) => {
  const videoId = getYouTubeId(url);

  if (!videoId) {
    return (
      <img
        src={url}
        alt="Course preview"
        style={{
          width: "100%",
          maxHeight: "360px",
          objectFit: "cover",
          display: "block",
        }}
        onError={(e) => (e.target.style.display = "none")}
      />
    );
  }

  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="Course preview"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
      />
    </div>
  );
};

const CourseDetail = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enrollMsg, setEnrollMsg] = useState("");
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/courses/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setCourse(Array.isArray(res.data) ? res.data[0] : res.data);
      } catch (err) {
        setError("Failed to load course.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id, token]);

  const handleEnroll = async () => {
    setEnrolling(true);
    setEnrollMsg("");
    try {
      await axios.post(
        "${import.meta.env.VITE_API_URL}/enroll",
        { courseId: id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setEnrollMsg("success");
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || "Enrollment failed.");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading)
    return (
      <div
        style={{
          padding: "4rem",
          textAlign: "center",
          color: "var(--text-secondary)",
        }}
      >
        Loading course...
      </div>
    );

  if (error)
    return (
      <div
        style={{ padding: "4rem", textAlign: "center", color: "var(--red)" }}
      >
        {error}
      </div>
    );

  if (!course)
    return (
      <div
        style={{
          padding: "4rem",
          textAlign: "center",
          color: "var(--text-muted)",
        }}
      >
        Course not found.
      </div>
    );

  return (
    <div
      style={{ maxWidth: "1000px", margin: "0 auto", padding: "2.5rem 2rem" }}
    >
      {/* Back button */}
      <button
        className="btn btn-outline btn-sm"
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        ← Back
      </button>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 300px",
          gap: "2rem",
          alignItems: "start",
        }}
      >
        {/* Left — course info */}
        <div>
          {/* Header */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "2rem",
              marginBottom: "1.25rem",
              boxShadow: "var(--glow)",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "8px",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              {course.category && (
                <span className="badge badge-purple">{course.category}</span>
              )}
              {course.difficulty && (
                <span className={`badge ${difficultyColor(course.difficulty)}`}>
                  {course.difficulty}
                </span>
              )}
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: "800",
                letterSpacing: "-0.5px",
                lineHeight: "1.3",
                marginBottom: "1rem",
                background: "var(--gradient-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {course.title}
            </h1>
            <p
              style={{
                color: "var(--text-secondary)",
                fontSize: "14px",
                lineHeight: "1.7",
              }}
            >
              {course.description}
            </p>
          </div>

          {/* YouTube / preview */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              overflow: "hidden",
              marginBottom: "1.25rem",
              boxShadow: "var(--glow)",
            }}
          >
            {course.previewVideoUrl ? (
              <YouTubeEmbed url={course.previewVideoUrl} />
            ) : (
              <div
                style={{
                  height: "240px",
                  background:
                    "linear-gradient(135deg, var(--purple-dim), var(--teal-dim))",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "64px",
                }}
              >
                📚
              </div>
            )}
          </div>

          {/* What you'll learn */}
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1.5rem",
              boxShadow: "var(--glow)",
            }}
          >
            <h2
              style={{
                fontSize: "15px",
                fontWeight: "700",
                textTransform: "uppercase",
                letterSpacing: "0.5px",
                marginBottom: "1rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid var(--border)",
              }}
            >
              What you'll learn
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "10px",
              }}
            >
              {[
                "Core concepts and fundamentals",
                "Hands-on practical exercises",
                "Real-world project experience",
                "Industry best practices",
                "Problem solving techniques",
                "Confidence to build independently",
              ].map((item) => (
                <div
                  key={item}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--teal)",
                      fontWeight: "700",
                      flexShrink: 0,
                    }}
                  >
                    ✓
                  </span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — enroll card */}
        <div style={{ position: "sticky", top: "80px" }}>
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius)",
              padding: "1.5rem",
              boxShadow: "var(--glow-hover)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {/* Free badge */}
            <span
              className="badge badge-green"
              style={{
                alignSelf: "flex-start",
                fontSize: "13px",
                padding: "5px 14px",
              }}
            >
              Free
            </span>

            {enrollMsg === "success" ? (
              <div
                style={{
                  background: "var(--green-dim)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  color: "var(--green)",
                  padding: "12px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  fontWeight: "600",
                  textAlign: "center",
                }}
              >
                ✓ You're enrolled! Head to your Dashboard to start learning.
              </div>
            ) : (
              <>
                {enrollMsg && (
                  <p className="error-text" style={{ textAlign: "center" }}>
                    {enrollMsg}
                  </p>
                )}
                <button
                  className="btn btn-gradient"
                  style={{ width: "100%", padding: "14px", fontSize: "15px" }}
                  onClick={handleEnroll}
                  disabled={enrolling}
                >
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </button>
              </>
            )}

            {/* Course meta */}
            <div
              style={{
                borderTop: "1px solid var(--border)",
                paddingTop: "1rem",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {[
                { label: "Category", value: course.category || "—" },
                { label: "Difficulty", value: course.difficulty || "—" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "13px",
                  }}
                >
                  <span style={{ color: "var(--text-secondary)" }}>
                    {label}
                  </span>
                  <span style={{ fontWeight: "600" }}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;

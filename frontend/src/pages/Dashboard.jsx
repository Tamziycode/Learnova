import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// ─── Profile Edit Form ─────────────────────────────────────
const ProfileEditForm = ({ user, token, onClose }) => {
  const [formData, setFormData] = useState({
    username: user?.username || "",
    email: user?.email || "",
    gender: user?.gender || "",
    password: "",
    cPassword: "",
  });
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password && formData.password !== formData.cPassword) {
      setMsg("Passwords do not match.");
      return;
    }
    setSubmitting(true);
    setMsg("");
    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        gender: formData.gender,
      };
      if (formData.password) payload.password = formData.password;

      await axios.post("http://localhost:5000/user/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("success");
    } catch (err) {
      setMsg(err.response?.data?.message || "Update failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 200,
        padding: "1rem",
        backdropFilter: "blur(2px)",
      }}
    >
      <div
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          padding: "2rem",
          width: "100%",
          maxWidth: "420px",
          boxShadow: "var(--glow-hover)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1.5rem",
          }}
        >
          <h2 style={{ fontSize: "16px", fontWeight: "700" }}>Edit Profile</h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              fontSize: "20px",
              cursor: "pointer",
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {msg === "success" ? (
          <div
            style={{
              background: "var(--green-dim)",
              border: "1px solid rgba(52,211,153,0.2)",
              color: "var(--green)",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
              fontSize: "13px",
              textAlign: "center",
              marginBottom: "1rem",
            }}
          >
            ✓ Profile updated successfully!
          </div>
        ) : msg ? (
          <p className="error-text" style={{ marginBottom: "1rem" }}>
            {msg}
          </p>
        ) : null}

        <form className="create-course-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Prefer not to say</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>New Password (optional)</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current"
              autoComplete="new-password"
            />
          </div>
          <div className="form-group">
            <label>Confirm New Password</label>
            <input
              name="cPassword"
              type="password"
              value={formData.cPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
              autoComplete="new-password"
            />
          </div>
          <button
            className="btn btn-gradient"
            type="submit"
            disabled={submitting}
            style={{ width: "100%", padding: "11px" }}
          >
            {submitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── Student Dashboard ─────────────────────────────────────
const StudentDashboard = ({ user, token }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:5000/enroll", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [token]);

  return (
    <>
      {showEdit && (
        <ProfileEditForm
          user={user}
          token={token}
          onClose={() => setShowEdit(false)}
        />
      )}
      <div className="dashboard-grid">
        {/* Profile Card */}
        <div>
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.username?.[0]?.toUpperCase() || "S"}
            </div>
            <h2>{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
            <span className="profile-role">Student</span>
            <div className="profile-stats">
              <div className="profile-stat">
                <span>Enrolled courses</span>
                <span>{courses.length}</span>
              </div>
              <div className="profile-stat">
                <span>Gender</span>
                <span style={{ textTransform: "capitalize" }}>
                  {user?.gender || "—"}
                </span>
              </div>
            </div>
            <button
              className="btn btn-outline btn-sm"
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={() => setShowEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main content */}
        <div>
          <div className="dashboard-section">
            <h2>My Courses</h2>
            {loading ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Loading...
              </p>
            ) : courses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <p>You haven't enrolled in any courses yet.</p>
                <button
                  className="btn btn-primary mt-2"
                  onClick={() => navigate("/Courses")}
                >
                  Browse Courses
                </button>
              </div>
            ) : (
              courses.map((course) => (
                <div className="enrolled-course-row" key={course.courseId}>
                  <div className="course-thumb">📚</div>
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>
                      {course.category} • {course.difficulty}
                    </p>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${Math.floor(Math.random() * 80) + 10}%`,
                        }}
                      />
                    </div>
                  </div>
                  <button
                    className="btn btn-outline btn-sm"
                    onClick={() => navigate(`/course/${course.courseId}`)}
                  >
                    Continue
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Instructor Dashboard ──────────────────────────────────
const InstructorDashboard = ({ user, token }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showEdit, setShowEdit] = useState(false);
  const [deleting, setDeleting] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    difficulty: "Beginner",
    videourl: "",
    previewvideourl: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");

  const fetchCourses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/courses/my-courses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [token]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setMsg("");
    try {
      await axios.post("http://localhost:5000/courses", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMsg("success");
      setFormData({
        title: "",
        description: "",
        category: "",
        difficulty: "Beginner",
        videourl: "",
        previewvideourl: "",
      });
      fetchCourses();
    } catch (err) {
      setMsg(err.response?.data?.message || "Failed to create course.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    setDeleting(courseId);
    try {
      await axios.delete(`http://localhost:5000/courses/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCourses((prev) => prev.filter((c) => c.id !== courseId));
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      {showEdit && (
        <ProfileEditForm
          user={user}
          token={token}
          onClose={() => setShowEdit(false)}
        />
      )}
      <div className="dashboard-grid">
        {/* Profile card */}
        <div>
          <div className="profile-card">
            <div className="profile-avatar">
              {user?.username?.[0]?.toUpperCase() || "I"}
            </div>
            <h2>{user?.username}</h2>
            <p className="profile-email">{user?.email}</p>
            <span
              className="profile-role"
              style={{ background: "var(--teal-dim)", color: "var(--teal)" }}
            >
              Instructor
            </span>
            <div className="profile-stats">
              <div className="profile-stat">
                <span>Total courses</span>
                <span>{courses.length}</span>
              </div>
              <div className="profile-stat">
                <span>Gender</span>
                <span style={{ textTransform: "capitalize" }}>
                  {user?.gender || "—"}
                </span>
              </div>
            </div>
            <button
              className="btn btn-outline btn-sm"
              style={{ width: "100%", marginTop: "0.5rem" }}
              onClick={() => setShowEdit(true)}
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Main content */}
        <div>
          {/* Create course */}
          <div className="dashboard-section">
            <h2>Create a New Course</h2>
            {msg === "success" && (
              <div
                style={{
                  background: "var(--green-dim)",
                  border: "1px solid rgba(52,211,153,0.2)",
                  color: "var(--green)",
                  padding: "10px 14px",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "13px",
                  marginBottom: "1rem",
                }}
              >
                ✓ Course created successfully!
              </div>
            )}
            {msg && msg !== "success" && (
              <p className="error-text" style={{ marginBottom: "1rem" }}>
                {msg}
              </p>
            )}
            <form className="create-course-form" onSubmit={handleCreate}>
              <div className="form-row">
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    placeholder="e.g. React for Beginners"
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <input
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Web Development"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  placeholder="What will students learn?"
                />
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>
              </div>
              <div className="form-group">
                <label>Video URL</label>
                <input
                  name="videourl"
                  value={formData.videourl}
                  onChange={handleChange}
                  placeholder="https://... (.mp4, .webm or YouTube link)"
                />
              </div>
              <div className="form-group">
                <label>Preview Thumbnail URL</label>
                <input
                  name="previewvideourl"
                  value={formData.previewvideourl}
                  onChange={handleChange}
                  placeholder="https://... (image or video URL)"
                />
              </div>
              <button
                className="btn btn-teal"
                type="submit"
                disabled={submitting}
              >
                {submitting ? "Creating..." : "Create Course"}
              </button>
            </form>
          </div>

          {/* Course list */}
          <div className="dashboard-section">
            <h2>Your Courses</h2>
            {loading ? (
              <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
                Loading...
              </p>
            ) : courses.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📭</div>
                <p>You haven't created any courses yet.</p>
              </div>
            ) : (
              courses.map((course) => (
                <div className="instructor-course-row" key={course.id}>
                  <div className="course-info">
                    <h4>{course.title}</h4>
                    <p>
                      {course.category} • {course.difficulty}
                    </p>
                  </div>
                  <div className="course-actions">
                    <span className="badge badge-teal">
                      {course.enrollments || 0} students
                    </span>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(course.id)}
                      disabled={deleting === course.id}
                    >
                      {deleting === course.id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ─── Main Dashboard ────────────────────────────────────────
const Dashboard = () => {
  const { user, token } = useAuth();

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>
          Welcome back, <span>{user?.username}</span> 👋
        </h1>
        <p>
          {user?.role === "instructor"
            ? "Manage your courses and track your students."
            : "Pick up where you left off."}
        </p>
      </div>
      {user?.role === "instructor" ? (
        <InstructorDashboard user={user} token={token} />
      ) : (
        <StudentDashboard user={user} token={token} />
      )}
    </div>
  );
};

export default Dashboard;

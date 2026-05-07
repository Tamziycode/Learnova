import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const Courses = () => {
  const { token } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [enrolling, setEnrolling] = useState(null);
  const [enrollMsg, setEnrollMsg] = useState("");

  // rest of the file stays exactly the same...
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/courses`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data);
      } catch (err) {
        setError("Failed to load courses.");
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, [token]);

  const handleEnroll = async (courseId) => {
    setEnrolling(courseId);
    setEnrollMsg("");
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/enroll`,
        { courseId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setEnrollMsg("Enrolled successfully!");
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || "Enrollment failed.");
    } finally {
      setEnrolling(null);
    }
  };

  const categories = [
    ...new Set(courses.map((c) => c.category).filter(Boolean)),
  ];
  const difficulties = ["Beginner", "Intermediate", "Advanced"];

  const filtered = courses.filter((c) => {
    const matchSearch =
      c.title?.toLowerCase().includes(search.toLowerCase()) ||
      c.description?.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category ? c.category === category : true;
    const matchDifficulty = difficulty
      ? c.difficulty?.toLowerCase() === difficulty.toLowerCase()
      : true;
    return matchSearch && matchCategory && matchDifficulty;
  });

  return (
    <div className="courses-page">
      <div className="page-header">
        <h1>All Courses</h1>
        <p>Expand your skills with our courses</p>
      </div>

      <div className="courses-filters">
        <input
          className="search-input"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="filter-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <select
          className="filter-select"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">All Levels</option>
          {difficulties.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>

      {enrollMsg && (
        <p
          className={
            enrollMsg.includes("success") ? "success-text" : "error-text"
          }
          style={{ marginBottom: "1rem" }}
        >
          {enrollMsg}
        </p>
      )}

      {error && <p className="error-text">{error}</p>}

      {loading ? (
        <div className="courses-grid">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : filtered.length > 0 ? (
        <div className="courses-grid">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              onEnroll={handleEnroll}
              enrolling={enrolling === course.id}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <p>No courses match your search.</p>
        </div>
      )}
    </div>
  );
};

export default Courses;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

const HomePage = () => {
  const { token } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("${import.meta.env.VITE_API_URL}/courses", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCourses(res.data.slice(0, 6));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchCourses();
    else setLoading(false);
  }, [token]);

  return (
    <>
      <div className="hero">
        <h1>Learn Without Limits</h1>
        <p>Thousands of courses to help you grow your skills and career.</p>
        <div className="hero-buttons">
          <button className="btn-white" onClick={() => navigate("/Courses")}>
            Browse Courses
          </button>
          {!token && (
            <button
              className="btn-outline-white"
              onClick={() => navigate("/Signup")}
            >
              Get Started Free
            </button>
          )}
        </div>
      </div>

      <div className="homepage-courses">
        <h2>Featured Courses</h2>
        {loading ? (
          <div className="courses-grid">
            {[...Array(3)].map((_, i) => (
              <LoadingSkeleton key={i} />
            ))}
          </div>
        ) : courses.length > 0 ? (
          <div className="courses-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--text-muted)" }}>
            {token
              ? "No courses available yet."
              : "Sign in to see available courses."}
          </p>
        )}
      </div>
    </>
  );
};

export default HomePage;

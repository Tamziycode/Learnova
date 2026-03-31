import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import {
  ProtectedRoute,
  InstructorRoute,
  PublicRoute,
} from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import VerifyEmail from "./pages/VerifyEmail";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <ErrorBoundary>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/About" element={<About />} />
              <Route path="/verify-email" element={<VerifyEmail />} />

              {/* Auth routes */}
              <Route
                path="/Signup"
                element={
                  <PublicRoute>
                    <Signup />
                  </PublicRoute>
                }
              />
              <Route
                path="/Signin"
                element={
                  <PublicRoute>
                    <Signin />
                  </PublicRoute>
                }
              />

              {/* Protected routes */}
              <Route
                path="/Courses"
                element={
                  <ProtectedRoute>
                    <Courses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/course/:id"
                element={
                  <ProtectedRoute>
                    <CourseDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/Dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;

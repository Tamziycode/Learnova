import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import PricingList from "./components/PricingList";
import Footer from "./components/Footer";
import SearchBar from "./components/SearchBar";
import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Cart from "./pages/Cart";
import CourseDetail from "./pages/CourseDetail";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Courses" element={<Courses />} />
          <Route path="/CourseDetail" element={<CourseDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/About" element={<About />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;

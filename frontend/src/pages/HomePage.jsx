import React from "react";
import CourseCard from "../components/CourseCard";

const homePage = () => {
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Welcome to Tamziy</h1>
      <div className="homepage">
        <CourseCard />
        <CourseCard />
        <CourseCard />
      </div>
    </>
  );
};

export default homePage;

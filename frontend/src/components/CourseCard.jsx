import React from "react";
//This should be rendered dynamically from the details iin the database.
//All the fields should ie title, description, category and video url.
const CourseCard = () => {
  return (
    <div className="coursecard">
      <img className="cardImage" src="" alt="" />

      <p>Title:</p>
      <p>Description:</p>
      <p>Category:</p>
      <p>Instructor:</p>
      <p>Difficulty:</p>
      <p>Price:</p>
      <p>
        Preview vid.This should be a video tag that shows previews of the video
        on hover
      </p>
      <button>Enroll</button>
      <button>Details</button>
    </div>
  );
};

export default CourseCard;

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import cryptoGraphic from "../images/crypto-graphic.png";

const Courses = ({ context }) => {
  const [courses, setCourses] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    context.data
      .getCourses()
      .then((data) => setCourses(data))
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main>
      {/**
       *   Create Course module
       *
       */}
      <div className="wrap landing--module--container">
        <div className="landing--module">
          {/* LEFT SIDE */}
          <div className="landing--module--content--left">
            <div className="landing--module--content--left--slogan">
              <h1>Web3 courses taught and maintained by fellow degens</h1>
            </div>
            <div className="landing--module--content--left--description">
              <p>
                Lets face it we need something better than empty Twitter threads
                and drawn-out substacks. Here let's make some quality courses
                with full short-form curriculums.
              </p>
            </div>
            <div className="landing--module--content--left--newcourse">
              <NavLink to="/courses/create">
                <button className="button">Create Course</button>
              </NavLink>
            </div>
            <div className="landing--module--content--left--logos"></div>
          </div>
          {/* RIGHT SIDE */}
          <div className="landing--module--content--right">
            <img src={cryptoGraphic} alt="cryptoGraphic" />
          </div>
        </div>
      </div>
      <div className="wrap main--grid">
        {/**
         * Courses mapped out and displayed on page dependent on id.
         */}
        {courses?.map((course) => {
          return (
            <NavLink
              className="course--module course--link"
              to={`/courses/${course.id}`}
              key={course.id}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </NavLink>
          );
        })}
      </div>
    </main>
  );
};

export default Courses;

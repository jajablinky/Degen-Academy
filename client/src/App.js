import React from "react";
import { Route, Routes } from "react-router-dom";

//components
import Courses from "./components/Courses";
import Header from "./components/Header";
import CourseDetail from "./components/CourseDetail";
import CreateCourse from "./components/CreateCourse";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignUp from "./components/UserSignUp";
import UserSignOut from "./components/UserSignOut";

import withContext from "./Context";

const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const UpdateCourseWithContext = withContext(UpdateCourse);

const App = () => (
  <React.Fragment>
    <Header />

    <Routes>
      <Route exact path="/" element={<CoursesWithContext />} />
      <Route path="/courses/:id" element={<CourseDetailWithContext />} />
      <Route path="/createcourse" element={<CreateCourse />} />
      <Route path="/courses/:id/update" element={<UpdateCourseWithContext />} />
      <Route path="/signin" element={<UserSignIn />} />
      <Route path="/signup" element={<UserSignUp />} />
      {/* <Route path="/signout" element={<UserSignOut />} /> */}
      {/* This one is empty */}
    </Routes>
  </React.Fragment>
);

export default App;

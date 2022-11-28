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
import PrivateRoute from "./PrivateRoute";
import Forbidden from "./components/Forbidden";
import NotFound from "./components/NotFound";
import Error from "./components/Error";
import UserSignOut from "./components/SignOut";


import withContext from "./Context";

const HeaderWithContext = withContext(Header);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const PrivateRouteWithContext = withContext(PrivateRoute)


const App = () => (
  <>
    <HeaderWithContext />

    <Routes>
      <Route exact path="/" element={<CoursesWithContext />} />
      <Route path="/courses/:id" element={<CourseDetailWithContext />} />
      <Route
          path="courses/create"
          element={
            <PrivateRouteWithContext>
              <CreateCourseWithContext />
            </PrivateRouteWithContext>
          }
        />
        <Route
          path="courses/:id/update"
          element={
            <PrivateRouteWithContext>
              <UpdateCourseWithContext />
            </PrivateRouteWithContext>
          }
        />
      <Route path="/signin" element={<UserSignInWithContext />} />
      <Route path="/signup" element={<UserSignUpWithContext />} />
      <Route path="/signout" element={<UserSignOutWithContext />} />
      <Route path="/forbidden" element={<Forbidden />} />
      <Route path="/error" element={<Error />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;

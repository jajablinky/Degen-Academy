import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CourseDetail = ({ context }) => {
  /**
   * State handling for course, navigation being stored and id being referenced from url.
   */
  const [course, setCourse] = useState([]);
  let navigate = useNavigate();

  const { id } = useParams();

  /**
   * data being accessed from context to get course by id and setting course state and if not error handling for a 404 or 500.
   */
  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        setCourse(data);
      })
      .catch((err) => {
        if (err.message === "404") {
          navigate("/404");
        } else {
          navigate("error");
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   *  * ----/Handle Delete/----*
   * @param {*} id taking in id of course and making sure that authenticated user is signed in to send request to delete that specific course
   */
  const handleDelete = (id) => {
    context.data
      .deleteCourse(
        id,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };
  return (
    <>
      <div className="wrap">
        <form>
          <div className="main--flex">
            <div>
              <h1 className="course--name">{course.title}</h1>
              <p>
                By{" "}
                <i>
                  {course.firstName} {course.lastName}
                </i>
              </p>
              <br></br>
              <ReactMarkdown
                className="reactMarkdown"
                children={course.description}
              />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>

      <div className="actions--bar">
        <div className="wrap">
          {/**
           * Authenticated user being checked alongside course user id to make sure the right user is allowed to update or delete course
           */}
          {context.authenticatedUser &&
          context.authenticatedUser.id === course.userId ? (
            <React.Fragment>
              <Link className="button" to="update">
                Update Course
              </Link>
              <NavLink
                className="button"
                to="/"
                key={id}
                onClick={() => handleDelete(id)}
              >
                Delete Course
              </NavLink>
            </React.Fragment>
          ) : null}

          <Link className="button button-secondary" to="/">
            Return To List
          </Link>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;

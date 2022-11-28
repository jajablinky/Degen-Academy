import React, { useEffect, useState } from "react";
import {
  useParams,
  Link,
  NavLink,
  useNavigate
} from "react-router-dom";
import ReactMarkdown from "react-markdown";

const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState([]);
  let navigate = useNavigate();

  const { id } = useParams();

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
      <div className="actions--bar">
        <div className="wrap">
          {context.authenticatedUser &&
          context.authenticatedUser.id === course.userId ? (
            <React.Fragment>
              <Link className="button" to="update">
                update course
              </Link>
              <NavLink
                className="button"
                to="/"
                key={id}
                onClick={() => handleDelete(id)}
              >
                delete course
              </NavLink>
            </React.Fragment>
          ) : null}

          <Link className="button button-secondary" to="/">
            return to list
          </Link>
        </div>
      </div>

      <div className="wrap">
        <form>
          <div className="main--flex">
            <div>
              <h1 className="course--name">{course.title}</h1>
              <p>
                By <i>{course.firstName} {course.lastName}</i>
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
    </>
  );
};

export default CourseDetail;

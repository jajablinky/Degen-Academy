import React, { useEffect, useState } from "react";
import { useParams, Link, NavLink } from "react-router-dom";

const CourseDetail = ({ context }) => {
  const [course, setCourse] = useState([]);
  const [name, setName] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        setCourse(data);
        setName(`${data.User.firstName}, ${data.User.lastName}`);
    })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (id) => {
    context.data.deleteCourse(id);
  };

  return (
    <>
      <div className="actions--bar">
        <div className="wrap">
          <Link className="button" to="update">
            Update Course
          </Link>
          <NavLink className="button" to="/" key={id} onClick={handleDelete}>
            Delete Course
          </NavLink>
          <Link className="button button-secondary" to="/">
            Return to List
          </Link>
        </div>
      </div>
      
      <div className="wrap">
        <form>
          <div className="main--flex">
            <div>
              <h1 className="course--name">{course.title}</h1>
              <p>By {name ? name : "Unknown"}</p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <li>{course.materialsNeeded}</li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CourseDetail;

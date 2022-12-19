import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const [course, setCourse] = useState([]);
  const [errors, setErrors] = useState([]);

  const { id } = useParams();
  let navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        setCourse(data);
        setTitle(data.title);
        setDescription(data.description);
        setEstimatedTime(data.estimatedTime);
        setMaterialsNeeded(data.materialsNeeded);
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

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "courseTitle") {
      setTitle(value);
    } else if (id === "courseDescription") {
      setDescription(value);
    } else if (id === "estimatedTime") {
      setEstimatedTime(value);
    } else if (id === "materialsNeeded") {
      setMaterialsNeeded(value);
    } else {
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
    };
    console.log();

    await context.data
      .updateCourse(
        id,
        course,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          console.log(errors);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };

  return (
    <main>
      {context.authenticatedUser.id !== course.userId ? (
        navigate("/forbidden")
      ) : (
        <div className="wrap">
          <h1>Update Course</h1>
          {errors && errors.length ? (
            <div className="validation--errors">
              <h3>Validation Errors</h3>
              <ul>
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          ) : null}
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="main--flex">
              <div>
                <label htmlFor="courseTitle">Course Title</label>
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  placeholder={title}
                  value={title}
                  onChange={handleChange}
                />

                <p>
                  By {course.firstName}, {course.lastName}
                </p>

                <label htmlFor="courseDescription">Course Description</label>
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  defaultValue={description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <div>
                <label htmlFor="estimatedTime">Estimated Time</label>
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  placeholder={estimatedTime}
                  value={estimatedTime}
                  onChange={handleChange}
                />

                <label htmlFor="materialsNeeded">Materials Needed</label>
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  defaultValue={materialsNeeded}
                  onChange={handleChange}
                ></textarea>
              </div>
            </div>
            <Link to="/">
              <button className="button" type="submit" onClick={handleSubmit}>
                Update Course
              </button>
            </Link>
            <Link to="/">
              <button className="button button-secondary">Cancel</button>
            </Link>
          </form>
        </div>
      )}
    </main>
  );
};

export default UpdateCourse;

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UpdateCourse = ({ context }) => {
  const [course, setCourse] = useState([]);
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [materialsNeeded, setMaterialsNeeded] = useState("");

  useEffect(() => {
    context.data
      .getCourse(id)
      .then((data) => {
        setCourse(data);
        console.log(data);
        setTitle(course.title);
        setDescription(course.description);
        setEstimatedTime(course.estimatedTime);
        setMaterialsNeeded(course.materialsNeeded);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    return id === "courseTitle"
      ? setTitle(value)
      : id === "courseDescription"
      ? setDescription(value)
      : id === "estimatedTime"
      ? setEstimatedTime(value)
      : id === "materialsNeeded"
      ? setMaterialsNeeded(value)
      : e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      // userId: context.authenticatedUser.id, //used to be id
    };
    context.data
      .updateCourse(
        id,
        course,
        // context.authenticatedUser.email,
        // context.authenticatedUser.password
      )
    //   .then((errors) => {
    //     if (errors.length) {
    //       setErrors(errors);
    //       console.log(errors);
    //     } else {
    //       navigate("/");
    //     }
    //   })
      .catch((err) => {
        console.log(err);
        // navigate("/error")
      });
  };

  return (
    <>
      <div className="wrap">
        <h2>Update Course</h2>
        <br></br>
        <form onSubmit={handleSubmit}>
          <div className="main--flex">
            <div>
              <label htmlFor="courseTitle">Course Title</label>
              <input
                id="courseTitle"
                type="text"
                placeholder={title}
                value={title}
                onChange={handleChange}
              />

              <p>By </p>

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue={materialsNeeded}
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
          <Link>
          <button className="button" type="submit">
            Update Course
          </button>
          </Link>
          <Link to="/">
          <button className="button button-secondary">
            Cancel
          </button>
          </Link>
        </form>
      </div>
    </>
  );
};

export default UpdateCourse;

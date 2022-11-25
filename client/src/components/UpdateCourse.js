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
        setTitle(data.title);
        setDescription(data.description);
        setEstimatedTime(data.estimatedTime);
        setMaterialsNeeded(data.materialsNeeded);
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if(id === "courseTitle") {
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
                name="courseTitle"
                type="text"
                placeholder={title}
                value={title}
                onChange={handleChange}
              />

              {/* <p>By {course.User.firstName}, {course.User.lastName}</p> */}

              <label htmlFor="courseDescription">Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                defaultValue={description ? description : "Update with new description"}
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
                value={estimatedTime ? estimatedTime : "Update with new time"}
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

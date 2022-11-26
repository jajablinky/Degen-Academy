import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = ({ context }) => {
  const [errors, setErrors] = useState([]);
  const title = useRef("");
  const description = useRef("");
  const estimatedTime = useRef("");
  const materialsNeeded = useRef("");

  let navigate = useNavigate();
  const authUser = context.authenticatedUser;

  const handleSubmit = (e) => {
    e.preventDefault();
    const course = {
      userId: context.authenticatedUser.id,
      title: title.current.value,
      description: description.current.value,
      estimatedTime: estimatedTime.current.value,
      materialsNeeded: materialsNeeded.current.value,
    };

    context.data
      .createCourse(
        course,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
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
    <div className="wrap">
      <h1>create course</h1>
      {errors && errors.length ? (
        <div className="validation--errors">
          <h3>validation errors--*/</h3>
          <ul>
            <li>* Please provide a Value for "Title"</li>
            <li>* Please provide a Value for "Description"</li>
          </ul>
          <br></br>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="main--flex">
          <div>
            <label htmlFor="courseTitle">Course Title</label>
            <input
              id="courseTitle"
              name="courseTitle"
              type="text"
              defaultValue=""
              ref={title}
            />

            <p>
              <i>
                By{" "}
                <u>
                  {authUser.firstName} {authUser.lastName}
                </u>
              </i>
            </p>

            <label htmlFor="courseDescription">Course Description</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              ref={description}
            ></textarea>
          </div>
          <div>
            <label htmlFor="estimatedTime">Estimated Time</label>
            <input
              id="estimatedTime"
              name="estimatedTime"
              type="text"
              defaultValue=""
              ref={estimatedTime}
            />

            <label htmlFor="materialsNeeded">Materials Needed</label>
            <textarea
              id="materialsNeeded"
              name="materialsNeeded"
              ref={materialsNeeded}
            ></textarea>
          </div>
        </div>
        <button className="button" type="submit">
          create course
        </button>
        <Link to="/">
          <button className="button button-secondary">cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateCourse;

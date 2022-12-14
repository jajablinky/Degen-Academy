import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = ({ context }) => {
  /**
   * State Handling + Ref
   */
  const [errors, setErrors] = useState([]);
  const title = useRef("");
  const description = useRef("");
  const estimatedTime = useRef("");
  const materialsNeeded = useRef("");

  // Navigation being stored @navigate, and authenticated user being pulled from context to be stored in @authUser
  let navigate = useNavigate();
  const authUser = context.authenticatedUser;

  /**
   * ------Handle Submit -----/
   *
   * @param {*} e Creating course based on authenticated User id.
   * Passing course object to create course.
   * Error handling to account for course existing or an interal 500 error
   *
   */
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
    /**
     * Mapping out errors dependent on validation errors from Sequelize.
     * If not validation errors will not display
     */
    <div className="wrap">
      <h1>Create Course</h1>
      {errors && errors.length ? (
        <div className="validation--errors">
          <h3>validation errors--*/</h3>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
          <br></br>
        </div>
      ) : null}
      {/*
       *  Course inputs being referenced into useRef().
       * first name and last name being accessed depending on who is signed in
       *
       */}
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

        {/*
         * Create course button and cancel redirecting you back to home page.
         */}

        <button className="button" type="submit">
          Create course
        </button>
        <Link to="/">
          <button className="button button-secondary">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateCourse;

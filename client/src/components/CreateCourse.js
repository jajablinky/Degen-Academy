import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const CreateCourse = ({ context }) => {
  let navigate = useNavigate();
  
  const title = useRef('')
  const description = useRef('')
  const estimatedTime = useRef('')
  const materialsNeeded = useRef('')

  const handleSubmit =  (e) => {
    e.preventDefault()
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded
    }
     context.data
      .createCourse(course)
      .catch((err) => {
        console.log(err);
        navigate('/')
      });
  }

  return (
    <div className="wrap">
      <h1>Create Course</h1>
      {/* <div className="validation--errors">
        <h3>Validation Errors</h3>
        <ul>
          <li>Please provide a Value for "Title"</li>
          <li>Please provide a Value for "Description"</li>
        </ul>
      </div> */}
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

            <p>By {}</p>

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
          Create Course
        </button>
        <Link to="/">
          <button className="button button-secondary">Cancel</button>
        </Link>
      </form>
    </div>
  );
};

export default CreateCourse;

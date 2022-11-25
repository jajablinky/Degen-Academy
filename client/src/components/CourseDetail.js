import React, { useEffect, useState } from "react"
import {useParams, Link, NavLink} from "react-router-dom";


const CourseDetail = ({ context }) => {
    const [course, setCourse] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        context.data
          .getCourses()
          .then((data) => setCourse(data))
          .catch((err) => console.log(err));
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    return(
        <><div className="actions--bar">
            <div className="wrap">
                <Link className="button" to="update">Update Course</Link>
                <NavLink className="button" to="/" key={id}>Delete Course</NavLink>
                <Link className="button button-secondary" to="/">Return to List</Link>
            </div>
        </div>
        <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user.firstName}</p>

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
    )
}

export default CourseDetail;
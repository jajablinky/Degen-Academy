import React, { useEffect, useState } from "react";

const Courses = () => {
    const [data, setData] = useState(null);
    
    useEffect( () => {
        fetch('http://localhost:5000/api/courses')
            .then(res => res.json())
            .then(data => setData(data))
            .catch(err => (console.log(err.message)))
    }, []);

    return(
        <div className="bounds">
        <div className="grid-100">
          <h1>Welcome to the Main Page</h1>
        </div>
      </div>
    )
}

export default Courses;
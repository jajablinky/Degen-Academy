import React from "react";
import { Link } from "react-router-dom";

const Header = ({context}) => {

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <>
            {/* <span>Welcome! {user.firstName}</span> */}
            <Link to="/">Sign Out</Link>
          </>
          <>
            <Link className="signup" to="/signup">
              Sign Up
            </Link>
            <Link className="signin" to="/signin">
              Sign In
            </Link>
          </>
        </nav>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { NavLink } from "react-router-dom";

const Header = ({context}) => {

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        <nav>
          <React.Fragment>
            {/* <span>Welcome! {user.firstName}</span> */}
            <NavLink to="/signout">Sign Out</NavLink>
          </React.Fragment>
          <React.Fragment>
            <NavLink className="signup" to="/signup">
              Sign Up
            </NavLink>
            <NavLink className="signin" to="/signin">
              Sign In
            </NavLink>
          </React.Fragment>
        </nav>
      </div>
    </div>
  );
};

export default Header;

import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/degenacademy.png"


const Header = ({ context }) => {

/**
 *  HEADER ---/
 * 
 * Authorized user being accessed to display who is logged in.
 * Different parts of nav bar will show dependent if user is signed in or not
 */

  const authUser = context.authenticatedUser;

  return (
    <div className="header">
      <div className="bounds">
        <Link to="/"><img className="header--logo" src={logo} alt="degen academy logo"/></Link>
        <nav>
          {authUser ? (
            <>
              <span>
                welcome! {authUser.firstName}, {authUser.lastName} ✔
              </span>
              <Link to="/signout">sign out</Link>
            </>
          ) : (
            <>
              <Link className="signup" to="/signup">
                sign up
              </Link>
              <Link className="signin" to="/signin">
                sign in
              </Link>
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Header;

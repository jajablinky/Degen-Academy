import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/degenacademy.png";

const Header = ({ context }) => {
  /**
   *  HEADER ---/
   *
   * Authorized user being accessed to display who is logged in.
   * Different parts of nav bar will show dependent if user is signed in or not
   */

  const authUser = context.authenticatedUser;

  return (
    <>
      <div className="miniNav">
        This site is a demo made by Geoffrey Millar
        <a
          href="https://www.geoffreymillar.com"
          title="Geoffrey Millar"
          target="_blank"
          rel="noreferrer"
        >
          http://www.geoffreymillar.com
        </a>
      </div>
      <div className="header">
        <div className="bounds">
          <Link to="/">
            <img className="header--logo" src={logo} alt="degen academy logo" />
          </Link>
          <nav>
            {authUser ? (
              <>
                <span>
                  Welcome!{authUser.firstName}, {authUser.lastName} ✔
                </span>
                <Link to="/signout">Sign out</Link>
              </>
            ) : (
              <>
                <Link to="/signup">
                  <button className="signup">Sign Up</button>
                </Link>
                <Link to="/signin">
                  <button className="signin">Sign In</button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Header;

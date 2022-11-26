import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = ({ context }) => {
  let navigate = useNavigate();

  const authUser = context.authenticatedUser;

  const handleSignOut = async (e) => {
    e.preventDefault();
    await context.actions
      .signOut()
      .then(navigate("/"));
  };

  return (
    <div className="header">
      <div className="bounds">
        <Link to="/"><h1 className="header--logo">course.dev ☻</h1></Link>
        <nav>
          {authUser ? (
            <>
              <span>
                welcome! {authUser.firstName}, {authUser.lastName} ✔
              </span>
              <Link to="/" onClick={handleSignOut}>sign out</Link>
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

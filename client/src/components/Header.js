import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/degenacademy.png"


const Header = ({ context }) => {
  let navigate = useNavigate();

  const authUser = context.authenticatedUser;

  const handleSignOut = async (e) => {
    e.preventDefault();
    await context.actions
      .signOut()
      .then(navigate("/"))
      .catch((err) => {
        console.log(err);
        navigate('/error');
      })
  };

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

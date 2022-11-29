import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserSignIn = ({ context }) => {
  const [error, setError] = useState(false);
  const emailAddress = useRef(null);
  const password = useRef(null);

  let navigate = useNavigate();
  const location = useLocation();

  /**
   * HandleSubmit
   * @param {*} e  - Signs in adding reference of email address and password current value to authenticate if that user exists.
   * If user exists it will either navigate you to the create course or back to home page depending on how you got to sign-in page
   * If user is unable to authenticate, it sets an error state to let you know to re-try again.
   */

  const handleSubmit = async (e) => {
    e.preventDefault();
    await context.actions
      .signIn(emailAddress.current.value, password.current.value)
      .then((user) => {
        if (user) {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/");
          }
        } else {
          setError(true);
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  };

  return (
    <div className="form--centered">
      <h1>sign in</h1>
      <br></br>
      {error ? (
        <div className="validation--errors">
          <h3>Please Try Again</h3>
          <ul>'error with sign up.'</ul>
          <br></br>
        </div>
      ) : null}
      <form onSubmit={handleSubmit}>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          defaultValue=""
          ref={emailAddress}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          defaultValue=""
          ref={password}
        />

        <button className="button" type="submit">
          sign in
        </button>
        <Link to="/">
          <button className="button button-secondary">cancel</button>
        </Link>
      </form>
      <br></br>
      <p>
        Don't have a user account? Click here to <Link>sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
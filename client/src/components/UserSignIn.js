import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = ({ context }) => {
  const [submit, setSubmit] = useState(false);
  const [error, setError] = useState(false);
  let navigate = useNavigate();

  const emailAddress = useRef(null);
  const password = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    context.actions
      .signIn(emailAddress.current.value, password.current.value)
      .then((user) => {
        if (user) {
          setSubmit(true);
          navigate('/')
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
        {error ?
        <div className="validation--errors">
          <h3>Please Try Again</h3>
          <ul>'error with sign up.'</ul>
          <br></br>
        </div>
       : null}
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
          Sign In
        </button>
        <Link to="/">
          <button className="button button-secondary">Cancel</button>
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

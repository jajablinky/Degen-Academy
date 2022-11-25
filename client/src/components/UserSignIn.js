import React, { useRef } from "react";
import { Link } from "react-router-dom";

const UserSignIn = ({ context }) => {
    const emailAddress = useRef("");
    const password = useRef("");

  return (
    <div className="form--centered">
      <h1>Sign In</h1>
      <br></br>
      <form>
        <label htmlFor="emailAddress">Email Address</label>
        <input
          id="emailAddress"
          name="emailAddress"
          type="email"
          defaultValue=""
          ref={emailAddress}
        />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" type="password" defaultValue="" ref={password} />
        <button className="button" type="submit">
          Sign In
        </button>
        <Link to="/">
          <button className="button button-secondary">Cancel</button>
        </Link>
      </form>
      <p>
        Don't have a user account? Click here to <Link>sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;

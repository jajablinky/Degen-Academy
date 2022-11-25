import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserSignIn = ({ context }) => {
  let navigate = useNavigate;

  const firstName = useRef("");
  const lastName = useRef("");
  const emailAddress = useRef("");
  const password = useRef("");

  const handleSignUp = (e) => {
    e.preventDefault();
    const user = {
      firstName: firstName.current.value,
      lastName: lastName.current.value,
      emailAddress: emailAddress.current.value,
      password: password.current.value,
    };

    context.data
      .createUser(user)
      //   .then((errors) => {
      //     if (errors.length) {
      //       (console.log(errors));
      //     } else {
      //       context.actions
      //         .signIn(emailAddress.current.value, password.current.value)
      //         .then(() => {
      //           console.log("authenticaed");
      //           navigate("/");
      //         });
      //     }
      //   })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };
  return (
    <>
      <div className="form--centered">
        <h1>Sign Up</h1>
        <br></br>
        <form onSubmit={handleSignUp}>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue=""
            ref={firstName}
          />
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue=""
            ref={lastName}
          />
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
          <Link to ="/">
          <button className="button" type="submit">
            Sign Up
          </button>
          </Link>
          <Link to="/">
            <button className="button button-secondary">Cancel</button>
          </Link>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </>
  );
};

export default UserSignIn;

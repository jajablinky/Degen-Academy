import { useRef, useState } from "react";
import {  useNavigate, NavLink } from "react-router-dom";

const UserSignUp = ({ context }) => {
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

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
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions
            .signIn(emailAddress.current.value, password.current.value)
            .then(() => {
              navigate("/");
            });
        }
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  };
  function handleCancel() {
    navigate("/");
  }

  return (
    <main>
      <div className="form--centered">
        <h2>sign up</h2>
        {errors && errors.length ? (
          <div className="validation--errors">
            <h3>validation errors</h3>
            <ul>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}
        <form onSubmit={handleSignUp}>
          <label htmlFor="firstName">first name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            defaultValue=""
            ref={firstName}
          />
          <label htmlFor="lastName">last name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            defaultValue=""
            ref={lastName}
          />
          <label htmlFor="emailAddress">email address</label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            defaultValue=""
            ref={emailAddress}
          />
          <label htmlFor="password">password</label>
          <input
            id="password"
            name="password"
            type="password"
            defaultValue=""
            ref={password}
          />
          <button className="button" type="submit">
            Sign Up
          </button>
          <button onClick={handleCancel} className="button button-secondary">
            Cancel
          </button>
        </form>
        <p>
          already have a user account? click here to{" "}
          <NavLink to="/signin">sign in</NavLink>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

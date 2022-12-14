import { useRef, useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";

const UserSignUp = ({ context }) => {
  /**
   *  State and ref being stated.
   */
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();

  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);

  /**
   * sign-up takes from input fields to store in a user object to access through context the createUser function and signin
   * conditionals will direct user to error page OR display validation errors.
   * @param {*} e
   */
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
        <h2>Sign Up</h2>
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
          <button className="log" type="submit">
            Sign Up
          </button>
          <button onClick={handleCancel} className="reg">
            Cancel
          </button>
        </form>
        <p>
          Already have a user account? click here to{" "}
          <NavLink to="/signin">Sign In</NavLink>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;

import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

import "../css/login.css";
import { setUserAction } from "../store/Auth/actions";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function SignIn() {
  const dispatch = useDispatch();
  const { state } = useLocation();
  const fromSignup = state?.fromSignup;
  const { loading, error, message } = useSelector((state) => state.authReducer);

  const emailRef = useRef();
  const passRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };

    dispatch(setUserAction(data));
  };
  return (
    <div>
      {loading ? (
        <div className="loading">Loading ...</div>
      ) : (
        <div className="container signup__container">
          <div className="container__child signup__form">
            <h2>Sign In</h2>
            {error && (
              <Alert variant="danger" style={{ fontSize: "14px" }}>
                {message}
              </Alert>
            )}
            {fromSignup && (
              <Alert variant="success">
                Successfully Registered. Please Sign in.
              </Alert>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="text"
                  name="email"
                  id="email"
                  required
                  ref={emailRef}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  required
                  ref={passRef}
                  autoComplete="on"
                />
              </div>
              <div className="m-t-lg">
                <ul className="list-inline">
                  <li>
                    <input
                      className="btn btn--form"
                      type="submit"
                      value="Sign In"
                    />
                  </li>
                  <li className="new__link">
                    <a className="signup__link" href="/signup">
                      Not a member?
                    </a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignIn;

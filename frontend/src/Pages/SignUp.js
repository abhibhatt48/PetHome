import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";
import Loading from "../Components/Loading";

import "../css/login.css";
import axios from "../utils/axios";

function SignUp() {
  const emailRef = useRef();
  const passRef = useRef();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    const data = {
      email: emailRef.current.value,
      password: passRef.current.value,
    };
    setLoading(true);
    axios
      .post("/register", data)
      .then(({ data }) => {
        if (data.success) {
          history.push("/signin", { fromSignup: true });
        }
        setError(data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <div className="container signup__container">
          <div className="container__child signup__form">
            <h2>Sign Up</h2>
            {error && (
              <Alert variant="danger" style={{ fontSize: "14px" }}>
                {error}
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
                  placeholder="james.bond@spectre.com"
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
                  placeholder="********"
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
                      value="Sign Up"
                    />
                  </li>
                  <li className="new__link">
                    <a className="signup__link" href="/signin">
                      Already a member?
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

export default SignUp;

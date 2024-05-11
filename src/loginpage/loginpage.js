import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
//   let token = localStorage.getItem("token") || null;

//   useEffect(() => {
//     if (token !== null) {
//       navigate("/");
//     }
//   }, [token]);
  const LoginBtnhandler = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const data = {
      email: email,
      password: password,
      returnSecureToken: true,
    };

    axios
      .post(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log("User signed in successfully:", response.data);
        localStorage.setItem("emailMailBox", response.data.email);
        localStorage.setItem("tokenMailBox", response.data.idToken);
        navigate("/");
      })
      .catch((error) => {
        alert("Please enter valid credentials");
        emailRef.current.value = "";
        passwordRef.current.value = "";
        console.error("Error signing in user:", error.response.data.error);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8 col-xs-12">
          <div className="card mt-5">
            <div className="card-header">
              <h4>Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={LoginBtnhandler}>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    ref={emailRef}
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    ref={passwordRef}
                    placeholder="Password"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                >
                  Login
                </button>
                <div className="mt-2">
                  Don't have an account?{" "}
                  <Link to="/signuppage">Signup here</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

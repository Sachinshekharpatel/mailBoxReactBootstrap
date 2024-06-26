import React, { useRef } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import registerImageSrc from "./registerpage.jpg";
const SignupPage = () => {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const apiKey = "AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0";
  const signupBtnHandler = () => {
    const email = emailRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmPasswordRef.current.value.trim();

    if (
      password === confirmPassword &&
      email.includes("@") &&
      email.includes(".")
    ) {
      const userRegistered = {
        email,
        password,
        returnSecureToken: true,
      };

      axios
        .post(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCptE9QtAawOyBKdjmzWWZM5PegYF0W-g0",
          userRegistered
        )
        .then((response) => {
          console.log("User registered:", userRegistered);
          emailRef.current.value = "";
          passwordRef.current.value = "";
          confirmPasswordRef.current.value = "";
          alert("User Registered Successfully");
          navigate("/loginpage");
        })
        .catch((error) => {
          alert("Please enter valid credentials");
          console.log("Error:", error);
        });
    } else {
      alert("Invalid Credentials");
      emailRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    }
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <h2 className="text-center mb-3 mt-3 " style={{color:"#0d6efd"}}>SachinMessenger</h2>
          <div
            style={{
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
              maxWidth: "100%",
              height: "auto",
              padding: "20px",
              borderRadius: "5px",
              backgroundColor: "#fff",
            }}
          >
            <div className="card-header">
              <img
                style={{ width: "60%", height: "40%" ,borderRadius:"10px",marginBottom:'3px'}}
                src={registerImageSrc}
              ></img>
            </div>
            <Form>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  ref={emailRef}
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </Form.Group>
              <Form.Group controlId="formBasicConfirmPassword">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  ref={confirmPasswordRef}
                />
              </Form.Group>
              <Button
                className="mt-3 w-100"
                variant="primary"
                onClick={signupBtnHandler}
              >
                Sign Up
              </Button>
              <div>
                Already have an account?
                <Link to="/loginpage"> Login here</Link>
              </div>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SignupPage;

import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import GoogleButton from "react-google-button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthContext } from "../services/firebaseService";

const Login = () => {
  const [validated, setValidated] = useState(false);
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });

  const { logIn,signInWithGoogle } = useUserAuthContext();
  console.log("useUserAuthContext", useUserAuthContext());
  const navigate = useNavigate();

  const { email, password } = inputValues;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      await logIn(email, password);
      toast.success("User logged in successfully");
      navigate("home");
    } catch (error) {
      toast.error(error.message);
    }
    setValidated(true);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputValues((lastValues) => {
      return {
        ...lastValues,
        [name]: value,
      };
    });
  };

  const handleGoogle = async() => {
    try {
        await signInWithGoogle();
        toast.success('User signed in successfully');
        navigate('home')
    } catch (error) {
        toast.error(error.message)
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center vh-100">
        <h3 className="text-align-center">Login</h3>
        <Form
          className="w-100 gap-3 d-flex justify-content-center align-items-center flex-column"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              className="w-100"
              required
              type="email"
              placeholder="First name"
              name="email"
              value={email}
              onChange={(e) => handleChange(e)}
              //   defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={(e) => handleChange(e)}

              //   defaultValue="Mark"
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Button type="submit">Login</Button>
          <GoogleButton onClick={handleGoogle} />
          <Button onClick={()=>navigate('signin-with-phone')}>Sign in with Phone Number</Button>
          <Link to='forgot-password'>Forgot Password?</Link>

          <p>
            Don't have an account? <Link to="signup">Signup</Link>{" "}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Login;

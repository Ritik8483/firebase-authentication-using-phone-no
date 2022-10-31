import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthContext } from "../services/firebaseService";

const Signup = () => {
  const [validated, setValidated] = useState(false);
  
  const {signUp}=useUserAuthContext();
    const navigate=useNavigate();
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const { email, password } = inputValues;
  const handleSubmit = async(event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
        await signUp(email,password);
        toast.success('User signup successfully');
        navigate('/')
    } catch (error) {
        toast.error(error.message);
        console.log(error);
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

  return (
    <div>
      <div className="d-flex justify-content-center flex-column align-items-center vh-100">
        <h3 className="text-align-center">Signup</h3>
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
          <Button type="submit">Signup</Button>
          <p>
            Already have an account? <Link to="/">Login</Link>{" "}
          </p>
        </Form>
      </div>
    </div>
  );
};

export default Signup;

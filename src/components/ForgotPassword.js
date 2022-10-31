import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthContext } from "../services/firebaseService";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const { forgetPass } = useUserAuthContext();
  const emailRef=useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('ee',email);
    try {
      await forgetPass(email);
    //   emailRef.current.value="";
      toast.success("Email has been sent to your registered email address");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="w-100 my-3 gap-3 d-flex align-items-center flex-column"
          md="4"
          controlId="validationCustom01"
        >
          <Form.Label className="w-50">Email</Form.Label>
          <Form.Control
            ref={emailRef}
            className="w-50"
            required
            type="email"
            placeholder="First name"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          <Button type="submit">Save</Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default ForgotPassword;

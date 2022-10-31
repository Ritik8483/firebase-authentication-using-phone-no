import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import { useUserAuthContext } from "../services/firebaseService";
import { toast } from "react-toastify";

const SignInWithPhone = () => {
  const [validated, setValidated] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const [otp, setOTP] = useState("");
  const [showOtp, setShowOTP] = useState(false);
  const [confirmResp, setConfirmResp] = useState("");
  const navigate = useNavigate();
  const { signInWithNumber } = useUserAuthContext();

  const handleSubmit = async (event) => {
    console.log("phoneNo", phoneNo);
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    try {
      const response = await signInWithNumber(phoneNo);
      setConfirmResp(response);
      setShowOTP(true);
      console.log("response", response);
    } catch (error) {
      toast.error(error.message);
    }
    setValidated(true);
  };

  const verfyOTP = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) {
      return;
    }
    try {
      await confirmResp.confirm(otp);
      navigate('/home');
    } catch (error) {
      toast.error(error.message);
    }
    console.log("otp", otp);
  };

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center flex-column vh-100">
        <Form
          style={{ display: !showOtp ? "block" : "none" }}
          // className="w-100 gap-3 d-flex justify-content-center align-items-center flex-column"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group md="4" controlId="validationCustom055">
            <Form.Label>Email</Form.Label>
            <PhoneInput
              defaultCountry="IN"
              placeholder="Enter phone number"
              value={phoneNo}
              onChange={setPhoneNo}
            />
            <div id="recaptcha-container"></div>
            <Form.Control.Feedback>Sign</Form.Control.Feedback>
          </Form.Group>
          <div className="d-flex mt-4 align-items-center gap-3">
            <Button onClick={() => navigate(-1)} variant="secondary">
              Back
            </Button>
            <Button type="submit">Send OTP</Button>
          </div>
        </Form>

        <Form
          style={{ display: showOtp ? "block" : "none" }}
          // className="w-100 mt-4 gap-3 d-flex justify-content-center align-items-center flex-column"
          noValidate
          onSubmit={verfyOTP}
        >
          <Form.Group md="4" controlId="vOTP5">
            <Form.Label>Verify OTP</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              // defaultValue="Mark"
            />
            {/* <div id="recaptcha-container"></div> */}
            {/* <Form.Control.Feedback>Sign</Form.Control.Feedback> */}
          </Form.Group>
          <div className="d-flex mt-4 align-items-center gap-3">
            <Button onClick={() => navigate(-1)} variant="secondary">
              Back
            </Button>
            <Button type="submit">Verify OTP</Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignInWithPhone;

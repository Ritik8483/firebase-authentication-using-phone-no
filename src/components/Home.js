import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUserAuthContext } from "../services/firebaseService";

const Home = () => {
  const { logout } = useUserAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('User logout successfully');
      navigate("/");

    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div>
      <div>
        Home
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </div>
  );
};

export default Home;

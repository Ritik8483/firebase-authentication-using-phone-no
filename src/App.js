import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import { ToastContainer } from "react-toastify";
import { FirebaseServiceProvider } from "./services/firebaseService";
import Home from "./components/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./components/ForgotPassword";
import SignInWithPhone from "./components/SignInWithPhone";

function App() {
  return (
    <div>
      <FirebaseServiceProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="home" element={<ProtectedRoute><Home/></ProtectedRoute>} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="signin-with-phone" element={<SignInWithPhone />} />
          </Routes>
        </BrowserRouter>
      </FirebaseServiceProvider>
      <ToastContainer />
    </div>
  );
}

export default App;

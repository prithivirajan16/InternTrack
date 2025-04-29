import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function LoginSignup() {
  const [role, setRole] = useState(""); //student or coordinator
  const [mode, setMode] = useState("login"); // login or signup
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const reg_no = form.reg_no?.value;
    const email = form.email?.value;
    const password = form.password.value;
    const name = form.name?.value;

    try {
      let endpoint = role === "student"
        ? "http://localhost:5000/api/auth"
        : "http://localhost:5000/api/coordinator";

      if (mode === "signup") {
        const data = role === "student"
          ? { reg_no, password, name }
          : { email, password, name };

        await axios.post(`${endpoint}/signup`, data);
        alert(`${role} signed up successfully!`);
        setMode("login"); 
        
      } else {
        const data = role === "student"
          ? { reg_no, password }
          : { email, password };

        const res = await axios.post(`${endpoint}/login`, data);

        if (res.data.success) {
          if (role === "student") {
            localStorage.setItem("reg_no", reg_no);
            navigate("/student/home");
          } else {
            localStorage.setItem("coordinator_email", email);
            navigate("/coordinator/home");
          }
        }
      }
    } catch (err) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">InternTrack Portal</h2>

      {!role ? (
        <div className="role-buttons">
          <h3>Select Role:</h3>
          <button className="role-button" onClick={() => setRole("student")}>
            Student
          </button>
          <button className="role-button" onClick={() => setRole("coordinator")}>
            Coordinator
          </button>
        </div>
      ) : (
        <>
          <h3>{role.charAt(0).toUpperCase() + role.slice(1)} {mode === "login" ? "Login" : "Signup"}</h3>
          <form className="login-form" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div className="form-group">
                <label>Name:</label>
                <input type="text" name="name" required className="form-input" />
              </div>
            )}

            {role === "student" && (
              <div className="form-group">
                <label>Register Number:</label>
                <input type="text" name="reg_no" required className="form-input" />
              </div>
            )}

            {role === "coordinator" && (
              <div className="form-group">
                <label>Email:</label>
                <input type="email" name="email" required className="form-input" />
              </div>
            )}

            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" required className="form-input" />
            </div>

            <button type="submit" className="submit-button">
              {mode === "login" ? "Login" : "Signup"}
            </button>
          </form>

          <div className="toggle-text">
            {mode === "login" ? (
              <p>
                New user?{" "}
                <span className="link-text" onClick={() => setMode("signup")}>
                  Sign up
                </span>
              </p>
            ) : (
              <p>
                Already a user?{" "}
                <span className="link-text" onClick={() => setMode("login")}>
                  Login
                </span>
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

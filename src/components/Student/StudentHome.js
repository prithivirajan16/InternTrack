import React from "react";
import { useNavigate } from "react-router-dom";

export default function StudentHome() {
  const navigate = useNavigate();

  const outerContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(to bottom right, #f8f0ff, #f0e6ff)",
  };

  const cardStyle = {
    backgroundColor: "#ffffff",
    padding: "60px 80px",
    borderRadius: "24px",
    boxShadow: "0 6px 30px rgba(0, 0, 0, 0.15)",
    textAlign: "center",
    width: "500px",
  };

  const headingStyle = {
    fontSize: "36px",
    color: "#6a0dad",
    marginBottom: "40px",
    fontWeight: "600",
  };

  const buttonStyle = {
    display: "block",
    width: "100%",
    padding: "18px",
    margin: "15px 0",
    backgroundColor: "#9b59b6",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const handleSignOut = () => {
    localStorage.removeItem("student_token");
    navigate("/");
  };

  return (
    <div style={outerContainerStyle}>
      <div style={cardStyle}>
        <h2 style={headingStyle}>Student Portal</h2>
        <button
          onClick={() => navigate("/student/add")}
          style={buttonStyle}
        >
          Add Internship Details
        </button>
        <button
          onClick={() => navigate("/student/edit")}
          style={buttonStyle}
        >
          Edit Internship Details
        </button>
        <button
          onClick={handleSignOut}
          style={buttonStyle}
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";

export default function CoordinatorHome() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("student_token");
    navigate("/");
  };

  return (
    <div className="container">
      <h2 className="page-title">Coordinator Portal</h2>
      
      <button
        onClick={() => navigate("/coordinator/view")}
      >
        Show Internship Details
      </button>

      <button
        onClick={() => navigate("/coordinator/delete/")}
      >
        Delete a Internship Detail
      </button>

      <button
        onClick={handleSignOut}
      >
        Sign Out
      </button>
    </div>
  );
}

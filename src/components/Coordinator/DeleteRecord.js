import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

export default function DeleteRecord() {
  const [regNo, setRegNo] = useState("");
  const navigate = useNavigate(); 

  const handleDelete = async () => {
    try {
      const res = await api.get("/");
      const match = res.data.find((s) => s.reg_no === regNo);
      if (match) {
        await api.delete(`/${match._id}`);
        alert("Deleted");
        setRegNo("");
      } else {
        alert("Student not found");
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2 style={{ marginBottom: "10px" }}>Delete an Internship Record</h2>
      
      <input
        placeholder="Enter Register Number"
        value={regNo}
        onChange={(e) => setRegNo(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={handleDelete}
        style={{
          padding: "10px 20px",
          backgroundColor: "#9b59b6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
          marginRight: "10px",
        }}
      >
        Delete
      </button>

      <button
        onClick={() => navigate("/coordinator/home")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#9b59b6",
          color: "white",
          border: "none",
          borderRadius: "4px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Back to Home
      </button>
    </div>
  );
}

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import "./Coordinator.css";

export default function Coordinator() {
  const [students, setStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); 

  const fetchData = async () => {
    if (!search.trim()) return;
    try {
      const res = await api.get("/");
      const result = res.data.find((s) => s.reg_no === search.trim());
      if (result) {
        setStudents([result]);
        setMessage("");
      } else {
        setStudents([]);
        setMessage("No student found.");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching data.");
    }
  };

  const displayAll = async () => {
    try {
      const res = await api.get("/");
      setStudents(res.data);
      setAllStudents(res.data); 
      setMessage("");
    } catch (err) {
      console.error(err);
      setMessage("Error fetching data.");
    }
  };

  const filterBySource = (source) => {
    const filtered = allStudents.filter(s => s.placement_source?.toLowerCase() === source.toLowerCase());
    setStudents(filtered);
  };

  const filterByLocation = (locationType) => {
    const filtered = allStudents.filter(s =>
      locationType === "India"
        ? s.location?.toLowerCase() === "india"
        : s.location?.toLowerCase() !== "india"
    );
    setStudents(filtered);
  };

  const filterByCompany = () => {
    const company = prompt("Enter company name:");
    if (!company) return;
    const filtered = allStudents.filter(s =>
      s.company_name?.toLowerCase().includes(company.toLowerCase())
    );
    setStudents(filtered);
  };

  return (
    <div>
      <h2>Coordinator - Internship Records</h2>

      <div className="container">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Enter Registration Number"
        />
        <button onClick={fetchData}>Search</button>
        <button onClick={displayAll}>View All Students</button>

        {/* Additional Filters */}
        <button onClick={() => filterBySource("College")}>From College</button>
        <button onClick={() => filterBySource("Own")}>From Own</button>
        <button onClick={() => filterByLocation("India")}>Internship in India</button>
        <button onClick={() => filterByLocation("Abroad")}>Internship in Abroad</button>
        <button onClick={filterByCompany}>Search based on Company</button>

        {}
        <button onClick={() => navigate("/coordinator/home")}>Back to Home</button>
      </div>

      {message && <p style={{ color: "red", marginBottom: "10px" }}>{message}</p>}

      <table>
        <thead>
          <tr>
            <th>Reg No</th>
            <th>Name</th>
            <th>Title</th>
            <th>Mobile No</th>
            <th>Section</th>
            <th>Obtained Internship?</th>
            <th>Period</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Company Name</th>
            <th>Placement Source</th>
            <th>Stipend</th>
            <th>Internship Type</th>
            <th>Location</th>
            <th>Proof Submissions</th>
            <th>Offer Letter?</th>
            <th>Joining Letter?</th>
            <th>Completion Certificate?</th>
            <th>Report?</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id}>
              <td>{s.reg_no}</td>
              <td>{s.name}</td>
              <td>{s.title}</td>
              <td>{s.mobile_no}</td>
              <td>{s.section}</td>
              <td>{s.obtained_internship}</td>
              <td>{s.period}</td>
              <td>{s.start_date}</td>
              <td>{s.end_date}</td>
              <td>{s.company_name}</td>
              <td>{s.placement_source}</td>
              <td>{s.stipend}</td>
              <td>{s.internship_type}</td>
              <td>{s.location}</td>
              <td>
                <a href={s.gdrive_folder_link} target="_blank" rel="noreferrer">
                  View
                </a>
              </td>
              <td>{s.proofs?.offer_letter ? "Yes" : "No"}</td>
              <td>{s.proofs?.joining_letter ? "Yes" : "No"}</td>
              <td>{s.proofs?.completion_certificate ? "Yes" : "No"}</td>
              <td>{s.proofs?.report ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

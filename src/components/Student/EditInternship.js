import React, { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";

export default function EditInternship() {
  const navigate = useNavigate();
  const [regNo, setRegNo] = useState("");
  const [formData, setFormData] = useState(null);
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      const res = await api.get("/");
      const student = res.data.find((s) => s.reg_no === regNo);

      if (student) {
        setFormData(student);
        setMessage("");
      } else {
        setFormData(null);
        setMessage("Student not found");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error fetching data");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("proofs")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        proofs: {
          ...prev.proofs,
          [key]: checked,
        },
      }));
    } else if (name === "location") {
      setFormData((prev) => ({ ...prev, location: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/${formData._id}`, formData);
      setMessage("Details updated successfully");
    } catch (err) {
      console.error(err);
      setMessage("Error updating details");
    }
  };

  const goToHome = () => {
    navigate("/student/home");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Edit Internship Detail</h1>
      {!formData ? (
        <div>
          <input
            type="text"
            placeholder="Enter Registration Number"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            style={{ border: "1px solid #ccc", padding: "8px" }}
          />
          <button
            onClick={fetchData}
            style={{
              marginLeft: "10px",
              padding: "8px 16px",
              backgroundColor: "#9b59b6",
              color: "white",
              border: "none",
            }}
          >
            Fetch
          </button>
          {message && (
            <p style={{ marginTop: "10px" }}>{message}</p>
          )}
        </div>
      ) : (
        <form style={{ marginTop: "20px" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold" }}>
            Edit Internship Details
          </h2>

          <div>
            <label>Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Internship Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Mobile Number</label>
            <input
              name="mobile_no"
              value={formData.mobile_no}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Section</label>
            <input
              name="section"
              value={formData.section}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Internship Period</label>
            <input
              name="period"
              value={formData.period}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Start Date</label>
            <input
              name="start_date"
              type="date"
              value={formData.start_date}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>End Date</label>
            <input
              name="end_date"
              type="date"
              value={formData.end_date}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Company Name</label>
            <input
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>GDrive Folder Link</label>
            <input
              name="gdrive_folder_link"
              value={formData.gdrive_folder_link}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Obtained Internship</label>
            <select
              name="obtained_internship"
              value={formData.obtained_internship}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            >
              <option value="">Select Internship Status</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div>
            <label>Placement Source</label>
            <select
              name="placement_source"
              value={formData.placement_source}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            >
              <option value="">Select Source</option>
              <option value="College">College</option>
              <option value="Own">Own</option>
            </select>
          </div>

          <div>
            <label>Stipend</label>
            <input
              name="stipend"
              type="number"
              value={formData.stipend}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            />
          </div>

          <div>
            <label>Internship Type</label>
            <select
              name="internship_type"
              value={formData.internship_type}
              onChange={handleChange}
              style={{
                display: "block",
                border: "1px solid #ccc",
                padding: "8px",
                width: "100%",
              }}
            >
              <option value="">Select Type</option>
              <option value="Academics">Academics</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>

          <div>
            <label>Internship Location</label>
            <div>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="location"
                  value="India"
                  checked={formData.location === "India"}
                  onChange={handleChange}
                />
                India
              </label>
              <label>
                <input
                  type="radio"
                  name="location"
                  value="Abroad"
                  checked={formData.location === "Abroad"}
                  onChange={handleChange}
                />
                Abroad
              </label>
            </div>
          </div>

          <div>
            <label style={{ fontWeight: "bold" }}>Proofs Submitted:</label>
            <label>
              <input
                type="checkbox"
                name="proofs.offer_letter"
                checked={formData.proofs?.offer_letter || false}
                onChange={handleChange}
              />
              Offer Letter
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="proofs.joining_letter"
                checked={formData.proofs?.joining_letter || false}
                onChange={handleChange}
              />
              Joining Letter
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="proofs.completion_certificate"
                checked={formData.proofs?.completion_certificate || false}
                onChange={handleChange}
              />
              Completion Certificate
            </label>
            <br />
            <label>
              <input
                type="checkbox"
                name="proofs.report"
                checked={formData.proofs?.report || false}
                onChange={handleChange}
              />
              Internship Report
            </label>
          </div>

          <button
            type="button"
            onClick={handleUpdate}
            style={{
              marginTop: "20px",
              padding: "8px 16px",
              backgroundColor: "#9b59b6",
              color: "white",
              border: "none",
            }}
          >
            Update
          </button>

          {message && (
            <p style={{ marginTop: "10px" }}>{message}</p>
          )}
        </form>
      )}

      <button
        type="button"
        onClick={goToHome}
        style={{ marginTop: "20px", padding: "8px 16px", backgroundColor: "#9b59b6", color: "white", border: "none" }}
      >
        Back to Student Home
      </button>
    </div>
  );
}

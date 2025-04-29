import React, { useState } from 'react';
import './studentForm.css';
import { useNavigate } from 'react-router-dom';

function AddInternship() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    reg_no: '',
    name: '',
    title: '',
    mobile_no: '',
    section: '',
    obtained_internship: '',
    period: '',
    duration_unit: 'Weeks',
    start_date: '',
    end_date: '',
    company_name: '',
    placement_source: '',
    stipend: '',
    internship_type: '',
    location: '',
    gdrive_folder_link: '',
    proofs: {
      offer_letter: false,
      joining_letter: false,
      completion_certificate: false,
      report: false
    }
  });

  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("proofs")) {
      const proofKey = name.match(/\[(.*?)\]/)[1];
      setFormData(prev => ({
        ...prev,
        proofs: {
          ...prev.proofs,
          [proofKey]: checked
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      reg_no, name, title, mobile_no, section, obtained_internship, period,
      duration_unit, start_date, end_date, company_name, placement_source,
      stipend, internship_type, location, gdrive_folder_link
    } = formData;

    if (!reg_no || !name || !title || !mobile_no || !section || !obtained_internship ||
        !period || !start_date || !end_date || !company_name || !placement_source ||
        !stipend || !internship_type || !location || !gdrive_folder_link) {
      setMessage("Please fill all required fields.");
      setIsError(true);
      return;
    }

    if (!/^\d{13}$/.test(formData.reg_no)) {
      setMessage("Registration Number must be a 13-digit number.");
      setIsError(true);
      return;
    }

    if (!/^\d{10}$/.test(mobile_no)) {
      setMessage("Mobile number must be a 10-digit number.");
      setIsError(true);
      return;
    }

    if (isNaN(stipend) || Number(stipend) < 0) {
      setMessage("Stipend must be a valid non-negative number.");
      setIsError(true);
      return;
    }

    // Duration validation with ±10 days
    const start = new Date(start_date);
    const end = new Date(end_date);
    if (start > end) {
      setMessage("Start date cannot be after End date.");
      setIsError(true);
      return;
    }

    const diffTime = end.getTime() - start.getTime();
    const actualDurationDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

    const enteredPeriod = parseFloat(period);
    let enteredDurationDays;

    if (duration_unit === "Days") enteredDurationDays = enteredPeriod;
    else if (duration_unit === "Weeks") enteredDurationDays = enteredPeriod * 7;
    else if (duration_unit === "Months") enteredDurationDays = enteredPeriod * 30;

    if (isNaN(enteredDurationDays) || enteredDurationDays <= 0) {
      setMessage("Please enter a valid numeric period.");
      setIsError(true);
      return;
    }

    const diff = Math.abs(enteredDurationDays - actualDurationDays);
    if (diff > 10) {
      setMessage(`Entered period (${enteredPeriod} ${duration_unit}) is not within the actual duration (${actualDurationDays} days).`);
      setIsError(true);
      return;
    }

    try {
      const checkResponse = await fetch('http://localhost:5000/api/students');
      const students = await checkResponse.json();
      const alreadyExists = students.some(student => student.reg_no === formData.reg_no);

      if (alreadyExists) {
        setMessage('A student with this Registration Number already exists.');
        setIsError(true);
        return;
      }

      const response = await fetch('http://localhost:5000/api/students/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || 'Form submitted successfully!');
        setIsError(false);
        setFormData({
          reg_no: '', name: '', title: '', mobile_no: '', section: '', obtained_internship: '',
          period: '', duration_unit: 'Weeks', start_date: '', end_date: '', company_name: '',
          placement_source: '', stipend: '', internship_type: '', location: '', gdrive_folder_link: '',
          proofs: {
            offer_letter: false,
            joining_letter: false,
            completion_certificate: false,
            report: false
          }
        });
      } else {
        setMessage(data.message || 'Failed to submit');
        setIsError(true);
      }

    } catch (err) {
      console.error('Error submitting form:', err);
      setMessage('Could not connect to server');
      setIsError(true);
    }
  };

  const goToHome = () => {
    navigate('/student/home');
  };

  return (
    <div className="container">
      <h2>Student Internship Form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="reg_no">Registration No:</label>
        <input type="text" id="reg_no" name="reg_no" value={formData.reg_no} onChange={handleChange} required />

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

        <label htmlFor="mobile_no">Mobile No:</label>
        <input type="text" id="mobile_no" name="mobile_no" value={formData.mobile_no} onChange={handleChange} required />

        <label htmlFor="section">Section:</label>
        <input type="text" id="section" name="section" value={formData.section} onChange={handleChange} required />

        <label htmlFor="obtained_internship">Obtained Internship:</label>
        <select id="obtained_internship" name="obtained_internship" value={formData.obtained_internship} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Yes">Yes</option>
          <option value="No">No</option>
        </select>

        <label htmlFor="period">Period:</label>
        <input type="text" id="period" name="period" value={formData.period} onChange={handleChange} required />

        <label htmlFor="duration_unit">Duration Unit:</label>
        <select id="duration_unit" name="duration_unit" value={formData.duration_unit} onChange={handleChange} required>
          <option value="Days">Days</option>
          <option value="Weeks">Weeks</option>
          <option value="Months">Months</option>
        </select>

        <label htmlFor="start_date">Start Date:</label>
        <input type="date" id="start_date" name="start_date" value={formData.start_date} onChange={handleChange} required />

        <label htmlFor="end_date">End Date:</label>
        <input type="date" id="end_date" name="end_date" value={formData.end_date} onChange={handleChange} required />

        <label htmlFor="company_name">Company Name:</label>
        <input type="text" id="company_name" name="company_name" value={formData.company_name} onChange={handleChange} required />

        <label htmlFor="placement_source">Placement Source:</label>
        <select id="placement_source" name="placement_source" value={formData.placement_source} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="College">College</option>
          <option value="Own">Own</option>
        </select>

        <label htmlFor="stipend">Stipend:</label>
        <input type="number" id="stipend" name="stipend" value={formData.stipend} onChange={handleChange} required />

        <label htmlFor="internship_type">Internship Type:</label>
        <select id="internship_type" name="internship_type" value={formData.internship_type} onChange={handleChange} required>
          <option value="">Select</option>
          <option value="Academics">Academics</option>
          <option value="Industrial">Industrial</option>
        </select>

        <label>Location:</label>
        <input type="radio" id="india" name="location" value="India" checked={formData.location === "India"} onChange={handleChange} required />
        <label htmlFor="india">India</label>

        <input type="radio" id="abroad" name="location" value="Abroad" checked={formData.location === "Abroad"} onChange={handleChange} required />
        <label htmlFor="abroad">Abroad</label>

        <fieldset className="proofs-fieldset">
          <legend>Proofs Submitted:</legend>

          <label htmlFor="gdrive_folder_link">Google Drive Folder Link (Containing Proofs):</label>
          <input
            type="url"
            id="gdrive_folder_link"
            name="gdrive_folder_link"
            value={formData.gdrive_folder_link}
            onChange={handleChange}
            required
          />

          <div className="proofs-container">
            <label>
              <input type="checkbox" name="proofs[offer_letter]" checked={formData.proofs.offer_letter} onChange={handleChange} />
              Offer Letter
            </label>
            <label>
              <input type="checkbox" name="proofs[joining_letter]" checked={formData.proofs.joining_letter} onChange={handleChange} />
              Joining Letter
            </label>
            <label>
              <input type="checkbox" name="proofs[completion_certificate]" checked={formData.proofs.completion_certificate} onChange={handleChange} />
              Completion Certificate
            </label>
            <label>
              <input type="checkbox" name="proofs[report]" checked={formData.proofs.report} onChange={handleChange} />
              Internship Report
            </label>
          </div>
        </fieldset>

        <button type="submit">Submit</button>
      </form>

      {message && (
        <div id="message" className={isError ? 'error' : ''}>
          {message}
        </div>
      )}

      <button type="button" onClick={goToHome} style={{ marginTop: '20px' }}>
        Back to Student Home
      </button>
    </div>
  );
}

export default AddInternship;

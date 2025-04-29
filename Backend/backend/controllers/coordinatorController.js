import Student from "../models/studentModel.js";

// GET all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students" });
  }
};

// GET student by registration number
export const getStudentByRegNo = async (req, res) => {
  const { reg_no } = req.params;
  try {
    const student = await Student.findOne({ reg_no });
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching student" });
  }
};

// FILTER by placement source (College / Own)
export const filterByPlacementSource = async (req, res) => {
  const { source } = req.params;
  try {
    const students = await Student.find({
      placement_source: { $regex: new RegExp(source, "i") },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error filtering by source" });
  }
};

// FILTER by location (India / Abroad)
export const filterByLocationType = async (req, res) => {
  const { type } = req.params;
  try {
    const students = await Student.find({});
    const filtered = students.filter(s =>
      type.toLowerCase() === "india"
        ? s.location?.toLowerCase() === "india"
        : s.location?.toLowerCase() !== "india"
    );
    res.json(filtered);
  } catch (error) {
    res.status(500).json({ message: "Error filtering by location" });
  }
};

// FILTER by company name (query param)
export const filterByCompanyName = async (req, res) => {
  const { company } = req.query;
  if (!company) return res.status(400).json({ message: "Company is required" });

  try {
    const students = await Student.find({
      company_name: { $regex: new RegExp(company, "i") },
    });
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error filtering by company" });
  }
};

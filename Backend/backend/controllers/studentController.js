import Student from "../models/studentModel.js";
import StudentLogin from "../models/studentSignup.js"

export const signupStudent = async (req, res) => {
  const { reg_no, password } = req.body;

  try {
    // Check if reg_no already exists
    const existing = await StudentLogin.findOne({ reg_no });
    if (existing) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    // Create new login entry (hash password in production)
    const newLogin = new StudentLogin({ reg_no, password });
    await newLogin.save();

    res.status(201).json({ message: 'Signup successful.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error during signup.' });
  }
};

export const createStudent = async (req, res) => {
  const { reg_no } = req.body;

  try {
    // Authorization check
    const loginExists = await StudentLogin.findOne({ reg_no: reg_no });
    if (!loginExists) {
      return res.status(403).json({ message: 'You are not authorized to submit this form.' });
    }

    // Duplication check
    const alreadySubmitted = await Student.findOne({ reg_no: reg_no });
    if (alreadySubmitted) {
      return res.status(409).json({ message: 'You have already submitted your internship details.' });
    }

    const newStudent = new Student(req.body);
    await newStudent.save();

    res.status(201).json({ message: 'Internship record submitted successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Not found" });
    res.status(200).json(student);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const filterStudents = async (req, res) => {
  try {
    const { location, placement_source, company_name, title, domain, period } = req.query;
    const query = {};
    if (location) query.location = location;
    if (placement_source) query.placement_source = placement_source;
    if (company_name) query.company_name = company_name;
    if (title) query.title = title;
    if (period) query.period = period;
    const students = await Student.find(query);
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

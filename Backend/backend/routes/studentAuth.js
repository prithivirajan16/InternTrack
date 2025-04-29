import express from "express";
const router = express.Router();
import StudentLogin from "../models/studentSignup.js";
import Student from "../models/studentModel.js";

// Student Signup
router.post("/signup", async (req, res) => {
  try {
    const { reg_no, password, name } = req.body;

    const existing = await StudentLogin.findOne({ reg_no });
    if (existing) return res.status(400).json({ success: false, message: "Student already exists." });

    const login = new StudentLogin({ reg_no, password, name });

    await login.save();

    res.status(201).json({ success: true, message: "Student Signup Success" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});


// Student Login
router.post("/login", async (req, res) => {
  try {
    const { reg_no, password } = req.body;

    const student = await StudentLogin.findOne({ reg_no });
    if (!student || student.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;


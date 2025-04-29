import express from "express";
const router = express.Router();
import Coordinator from "../models/coordinatorModel.js";

// Coordinator Signup
router.post("/signup", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    const existing = await Coordinator.findOne({ email });
    if (existing) return res.status(400).json({ success: false, message: "Coordinator already exists." });

    const coordinator = new Coordinator({ email, password, name });
    await coordinator.save();

    res.status(201).json({ success: true, message: "Coordinator Signup Success" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Coordinator Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const coordinator = await Coordinator.findOne({ email });
    if (!coordinator || coordinator.password !== password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    res.status(200).json({ success: true, message: "Login successful" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;

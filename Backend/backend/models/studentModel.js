import mongoose from "mongoose";

const proofSchema = new mongoose.Schema({
  offer_letter: Boolean,
  joining_letter: Boolean,
  completion_certificate: Boolean,
  report: Boolean,
});

const studentSchema = new mongoose.Schema({
  reg_no: { type: String, required: true, unique: true },
  name: String,
  title: String,
  mobile_no: String,
  section: String,
  obtained_internship: String,
  period: String,
  start_date: Date,
  end_date: Date,
  company_name: String,
  placement_source: String,
  stipend: Number,
  internship_type: String,
  location: String,
  gdrive_folder_link: String,
  proofs: proofSchema,
});

export default mongoose.model("Student", studentSchema);
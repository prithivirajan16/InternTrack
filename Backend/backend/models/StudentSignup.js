import mongoose from "mongoose";

const studentLoginSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reg_no: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Use export default instead of module.exports
export default mongoose.model('StudentLogin', studentLoginSchema, 'students_login');

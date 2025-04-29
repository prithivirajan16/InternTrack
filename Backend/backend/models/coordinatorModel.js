import mongoose from "mongoose";

const coordinatorSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  }
});

const Coordinator = mongoose.model("Coordinator", coordinatorSchema);

export default Coordinator;

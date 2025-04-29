import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import Student from './models/studentModel.js';

import studentRoutes from './routes/studentRoute.js';
import studentAuthRoutes from './routes/studentAuth.js';
import coordinatorAuthRoutes from './routes/coordinatorAuth.js';

const app = express();
dotenv.config();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);                    
app.use('/api/auth', studentAuthRoutes);                    
app.use("/api/coordinator", coordinatorAuthRoutes);    

// Connect to MongoDB and start server
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.URL;

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log(' MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error(' MongoDB connection error:', err.message);
  }); 
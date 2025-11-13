import dotenv from "dotenv";
dotenv.config();
import express from "express";

import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import authorityRoutes from "./routes/authorityRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Test Route
app.get("/", (req, res) => {
  res.send("GHMC Cleanliness Management API is running 🚀");
});

// Auth Routes
app.use("/api/auth", authRoutes);
app.use("/api/authorities", authorityRoutes);
app.use("/api/complaints", complaintRoutes);
console.log("Cloudinary:", process.env.CLOUDINARY_CLOUD_NAME);
console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
console.log("API SECRET:", process.env.CLOUDINARY_API_SECRET);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

import express from "express";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createComplaint,
  getUserComplaints,
  getAuthorityComplaints,
  updateComplaintStatus,
} from "../controllers/complaintController.js";

const router = express.Router();

// USER → create complaint
router.post("/", protect, upload.single("image"), createComplaint);

// USER → list their complaints
router.get("/user", protect, getUserComplaints);

// AUTHORITY → list assigned complaints
router.get("/authority", protect, getAuthorityComplaints);

// AUTHORITY → update complaint status
router.put("/:id/status", protect, updateComplaintStatus);

export default router;

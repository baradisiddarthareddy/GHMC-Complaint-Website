import Complaint from "../models/Complaint.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

// ----------------------------------------------
// Create Complaint (User)
// ----------------------------------------------
export const createComplaint = async (req, res) => {
  try {
    const { description, authorityId, lat, lng } = req.body;
    const userId = req.user._id;

    if (!description || !authorityId) {
      return res.status(400).json({ message: "Missing fields" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ---------- FIXED CLOUDINARY UPLOAD USING STREAM ----------
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ghmc_complaints" },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const uploadedImage = await uploadToCloudinary();

    // ---------- SAVE COMPLAINT ----------
    const complaint = await Complaint.create({
      userId,
      authorityId,
      description,
      imageUrl: uploadedImage.secure_url,
      location: { lat, lng },
    });

    res.status(201).json(complaint);
  } catch (error) {
    console.error("Create complaint failed:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ----------------------------------------------
// Get complaints for user
// ----------------------------------------------
export const getUserComplaints = async (req, res) => {
  try {
    const userId = req.user._id;
    const complaints = await Complaint.find({ userId }).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching user complaints" });
  }
};

// ----------------------------------------------
// Get complaints for authority
// ----------------------------------------------
export const getAuthorityComplaints = async (req, res) => {
  try {
    const authorityId = req.user._id;

    const complaints = await Complaint.find({ authorityId }).sort({
      createdAt: -1,
    });

    res.status(200).json(complaints);
  } catch (error) {
    res.status(500).json({ message: "Error fetching authority complaints" });
  }
};

// ----------------------------------------------
// Update complaint status
// ----------------------------------------------
export const updateComplaintStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["Pending", "In Progress", "Resolved"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updated = await Complaint.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Could not update status" });
  }
};

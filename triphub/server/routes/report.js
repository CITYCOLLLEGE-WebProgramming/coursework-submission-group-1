const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Report = require("../models/Report");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, email, description, problemType, termsAccepted } = req.body;
    const filePath = req.file ? req.file.path : "";

    const newReport = new Report({
      name,
      email,
      description,
      problemType,
      filePath,
      termsAccepted: termsAccepted === "true", 
    });

    await newReport.save();
    res.status(201).json({ message: "Report submitted successfully", report: newReport });
  } catch (error) {
    console.error("Error submitting report:", error);
    res.status(500).json({ message: "Error submitting report", error: error.message });
  }
});

module.exports = router;

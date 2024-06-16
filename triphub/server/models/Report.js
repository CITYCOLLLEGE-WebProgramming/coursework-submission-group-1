const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema(
  {
    name: { 
        type: String,
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    problemType: { 
        type: String, 
        required: true 
    },
    filePath: { 
        type: String 
    },
    termsAccepted: { 
        type: Boolean, 
        required: true },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema)
module.exports = Report

import mongoose from "mongoose";

const staffSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    role: { type: String, required: true, enum: ["Midwife", "Physician", "Reception"] },
    department: { type: String },
    phone: { type: String, required: true },
    status: { type: String, default: "Active", enum: ["Active", "Inactive"] },
  },
  { timestamps: true }
);

export default mongoose.model("Staff", staffSchema);

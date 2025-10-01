import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId, // reference Patient
      ref: "Patient",
      required: true,
    },
    doctor: { type: String, required: true },
    date: { type: Date, required: true },
    type: { type: String, required: true },
    status: { type: String, default: "Upcoming" },
  },
  { timestamps: true }
);

export default mongoose.model("Appointment", appointmentSchema);

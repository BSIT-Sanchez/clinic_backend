import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Female", "Male", "Other"], required: true },
    contact: { type: String, required: true },
    service: {
      type: String,
      enum: ["Prenatal Checkup", "Family Planning", "Ultrasound", "Immunization"],
      required: true,
    },
    address: { type: String, required: true },
    notes: { type: String },
    status: { type: String, enum: ["Active", "Archived"], default: "Active" },
    lastVisit: { type: Date },
    nextAppointment: { type: Date },
    patientId: { type: String, unique: true },
  },
  { timestamps: true }
);

patientSchema.pre("save", async function (next) {
  if (!this.patientId) {
    const count = await this.constructor.countDocuments();
    this.patientId = `P-${new Date().getFullYear()}-${(count + 1)
      .toString()
      .padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("Patient", patientSchema);

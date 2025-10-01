import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    totalPatients: { type: Number, default: 0 },
    completedAppointments: { type: Number, default: 0 },
    revenue: { type: Number, default: 0 },
    inventoryAlert: { type: Number, default: 0 }, // items low in stock
    dailySummary: [
      {
        date: { type: Date },
        patients: { type: Number },
        completedAppointments: { type: Number },
        revenue: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Report", reportSchema);

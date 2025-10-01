import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    patient: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    service: {
      type: String,
      enum: ["Prenatal Checkup", "Family Planning", "Ultrasound", "Immunization"],
      required: true,
    },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["Paid", "Partial", "Unpaid"], default: "Unpaid" },
    invoiceNumber: { type: String, unique: true },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

billingSchema.pre("save", async function (next) {
  if (!this.invoiceNumber) {
    const count = await this.constructor.countDocuments();
    this.invoiceNumber = `INV-${new Date().getFullYear()}-${(count + 1).toString().padStart(3, "0")}`;
  }
  next();
});

export default mongoose.model("Billing", billingSchema);

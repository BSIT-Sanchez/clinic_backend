import Billing from "../models/Billing.js";
import Patient from "../models/Patient.js";

// Get all billings
export const getBillings = async (req, res) => {
  try {
    const billings = await Billing.find().populate("patient");
    res.status(200).json(billings);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Get billing by ID
export const getBillingById = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate("patient");
    if (!billing) return res.status(404).json({ msg: "Billing not found" });
    res.status(200).json(billing);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Create new billing
export const createBilling = async (req, res) => {
  try {
    const { patientId, service } = req.body;

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ msg: "Patient not found" });

    // Set amount based on service
    let amount = 0;
    switch (service) {
      case "Prenatal Checkup":
        amount = 5000;
        break;
      case "Family Planning":
        amount = 15000;
        break;
      case "Ultrasound":
        amount = 3000;
        break;
      case "Immunization":
        amount = 1000;
        break;
      default:
        amount = 0;
    }

    const billing = new Billing({
      patient: patient._id,
      service,
      amount,
      status: "Unpaid",
    });

    const savedBilling = await billing.save();
    const populatedBilling = await savedBilling.populate("patient");
    res.status(201).json(populatedBilling);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Update billing
export const updateBilling = async (req, res) => {
  try {
    const { service, status } = req.body;
    const billing = await Billing.findById(req.params.id);
    if (!billing) return res.status(404).json({ msg: "Billing not found" });

    if (service) {
      billing.service = service;
      // Update amount based on service
      switch (service) {
        case "Prenatal Checkup":
          billing.amount = 5000;
          break;
        case "Family Planning":
          billing.amount = 15000;
          break;
        case "Ultrasound":
          billing.amount = 3000;
          break;
        case "Immunization":
          billing.amount = 1000;
          break;
        default:
          billing.amount = 0;
      }
    }

    if (status) billing.status = status;

    const updatedBilling = await billing.save();
    const populatedBilling = await updatedBilling.populate("patient");
    res.status(200).json(populatedBilling);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Delete billing
export const deleteBilling = async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) return res.status(404).json({ msg: "Billing not found" });

    await billing.remove();
    res.status(200).json({ msg: "Billing deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

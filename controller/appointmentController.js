import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";

// Get all appointments with patient details
export const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient") // populate patient details
      .sort({ date: 1 });
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Get single appointment by ID
export const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id).populate("patient");
    if (!appointment)
      return res.status(404).json({ success: false, msg: "Appointment not found" });
    res.status(200).json({ success: true, appointment });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Create new appointment
export const createAppointment = async (req, res) => {
  try {
    // Check if patient exists
    const patientExists = await Patient.findById(req.body.patient);
    if (!patientExists) {
      return res.status(404).json({ success: false, msg: "Patient not found" });
    }

    const appointment = new Appointment(req.body);
    await appointment.save();
    // populate patient in response
    await appointment.populate("patient");
    res.status(201).json({ success: true, appointment });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// Update appointment
export const updateAppointment = async (req, res) => {
  try {
    const updated = await Appointment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("patient");

    if (!updated) return res.status(404).json({ success: false, msg: "Appointment not found" });
    res.status(200).json({ success: true, appointment: updated });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// Delete appointment
export const deleteAppointment = async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, msg: "Appointment not found" });
    res.status(200).json({ success: true, msg: "Appointment deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

import Patient from "../models/Patient.js";

// Create new patient
export const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ success: true, patient });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, msg: err.message });
  }
};

// Get all patients
export const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find().sort({ createdAt: -1 });
    res.status(200).json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Get single patient
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ success: false, msg: "Patient not found" });
    res.status(200).json(patient);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Update patient
export const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!patient) return res.status(404).json({ success: false, msg: "Patient not found" });
    res.status(200).json({ success: true, patient });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, msg: err.message });
  }
};

// Archive/Delete patient
export const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      { status: "Archived" },
      { new: true }
    );
    if (!patient) return res.status(404).json({ success: false, msg: "Patient not found" });
    res.status(200).json({ success: true, msg: "Patient archived", patient });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

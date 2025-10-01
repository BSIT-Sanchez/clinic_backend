import Staff from "../models/Staff.js";

// Get all staff
export const getStaff = async (req, res) => {
  try {
    const staff = await Staff.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, staff });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Get single staff
export const getStaffById = async (req, res) => {
  try {
    const staffMember = await Staff.findById(req.params.id);
    if (!staffMember) return res.status(404).json({ success: false, msg: "Staff not found" });
    res.status(200).json({ success: true, staff: staffMember });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Create staff
export const createStaff = async (req, res) => {
  try {
    const staffMember = new Staff(req.body);
    await staffMember.save();
    res.status(201).json({ success: true, staff: staffMember });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

// Update staff
export const updateStaff = async (req, res) => {
  try {
    const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedStaff) return res.status(404).json({ success: false, msg: "Staff not found" });
    res.status(200).json({ success: true, staff: updatedStaff });
  } catch (err) {
    res.status(400).json({ success: false, msg: err.message });
  }
};

/// Permanent delete staff
export const deleteStaff = async (req, res) => {
  try {
    const staffMember = await Staff.findByIdAndDelete(req.params.id);
    if (!staffMember)
      return res.status(404).json({ success: false, msg: "Staff not found" });

    res.status(200).json({ success: true, msg: "Staff permanently deleted" });
  } catch (err) {
    res.status(500).json({ success: false, msg: err.message });
  }
};

import Patient from "../models/Patient.js";
import Appointment from "../models/Appointment.js";
import Staff from "../models/Staff.js";
import InventoryItem from "../models/InventoryItem.js";

// GET /api/dashboard/stats
export const getDashboardStats = async (req, res) => {
  try {
    const totalPatients = await Patient.countDocuments({ status: "Active" });
    const totalAppointments = await Appointment.countDocuments();
    const totalStaff = await Staff.countDocuments({ status: "Active" });
    const totalInventory = await InventoryItem.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        patients: totalPatients,
        appointments: totalAppointments,
        staff: totalStaff,
        inventory: totalInventory,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

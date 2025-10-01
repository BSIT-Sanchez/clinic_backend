import Patient from "../models/Patient.js";
import Billing from "../models/Billing.js";
import Appointment from "../models/Appointment.js";
import Inventory from "../models/InventoryItem.js";

// Existing getReports (KPIs + daily summary)
export const getReports = async (req, res) => {
  try {
    const startOfMonth = new Date();
    startOfMonth.setDate(1);

    // KPIs
    const patientsThisMonth = await Patient.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    const completedAppointments = await Appointment.countDocuments({
      date: { $gte: startOfMonth },
      status: "Completed",
    });

    const revenueAgg = await Billing.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);
    const revenue = revenueAgg[0]?.total || 0;

    const inventoryAlert = await Inventory.countDocuments({ stockLevel: { $lt: 5 } });

    const dailySummary = await Billing.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          patients: { $sum: 1 },
          completedApps: { $sum: { $cond: [{ $eq: ["$status", "Paid"] }, 1, 0] } },
          revenue: { $sum: "$amount" },
        },
      },
      {
        $project: {
          date: "$_id",
          patients: 1,
          completedApps: 1,
          revenue: 1,
          _id: 0,
        },
      },
      { $sort: { date: 1 } },
    ]);

    res.status(200).json({
      kpis: {
        patientsThisMonth,
        completedAppointments,
        revenue,
        inventoryAlert,
      },
      dailySummary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

// View a single daily report by date
export const viewReportByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const report = await Billing.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(date + "T00:00:00.000Z"),
            $lte: new Date(date + "T23:59:59.999Z"),
          },
        },
      },
      {
        $group: {
          _id: null,
          patients: { $sum: 1 },
          completedApps: { $sum: { $cond: [{ $eq: ["$status", "Paid"] }, 1, 0] } },
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    if (!report || report.length === 0) {
      return res.status(404).json({ success: false, msg: "Report not found" });
    }

    res.status(200).json({
      date,
      patients: report[0].patients,
      completedApps: report[0].completedApps,
      revenue: report[0].revenue,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

// Delete a daily report by date
export const deleteReportByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const result = await Billing.deleteMany({
      createdAt: {
        $gte: new Date(date + "T00:00:00.000Z"),
        $lte: new Date(date + "T23:59:59.999Z"),
      },
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, msg: "Report not found" });
    }

    res.status(200).json({ success: true, msg: "Report deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, msg: err.message });
  }
};

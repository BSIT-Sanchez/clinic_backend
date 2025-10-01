import express from "express";
import { getReports, viewReportByDate, deleteReportByDate } from "../controller/reportController.js";

const router = express.Router();

router.get("/", getReports);               // All reports
router.get("/:date", viewReportByDate);    // View single report
router.delete("/:date", deleteReportByDate); // Delete report by date

export default router;

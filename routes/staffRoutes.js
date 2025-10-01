import express from "express";
import {
  getStaff,
  getStaffById,
  createStaff,
  updateStaff,
  deleteStaff,
} from "../controller/staffController.js";

const router = express.Router();

// Routes
router.get("/", getStaff);
router.get("/:id", getStaffById);
router.post("/", createStaff);
router.put("/:id", updateStaff);
router.delete("/:id", deleteStaff);

export default router;

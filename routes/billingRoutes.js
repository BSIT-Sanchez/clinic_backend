import express from "express";
import {
  getBillings,
  getBillingById,
  createBilling,
  updateBilling,
  deleteBilling,
} from "../controller/billingController.js";

const router = express.Router();

router.get("/", getBillings);
router.get("/:id", getBillingById);
router.post("/", createBilling);
router.put("/:id", updateBilling);
router.delete("/:id", deleteBilling);

export default router;

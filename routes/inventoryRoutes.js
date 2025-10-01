import express from "express";
import {
  getAllItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
} from "../controller/inventoryController.js";

const router = express.Router();

router.get("/", getAllItems);
router.get("/:id", getItem);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

export default router;

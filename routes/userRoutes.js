import express from "express";
import { getUsers, getUserById, updateUser, deleteUser } from "../controller/usersController.js";

const router = express.Router();

router.get("/", getUsers);         // GET all users
router.get("/:id", getUserById);   // GET single user
router.put("/:id", updateUser);    // UPDATE user
router.delete("/:id", deleteUser); // DELETE user

export default router;

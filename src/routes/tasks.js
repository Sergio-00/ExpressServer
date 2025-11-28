import passport from "../config/passport.js";
import {
  getTasks,
  createTask,
  putTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import express from "express";
const router = express.Router();

const requireAuth = passport.authenticate("jwt", { session: false });

router.get("/", requireAuth, getTasks);
router.post("/", requireAuth, createTask);
router.put("/:id", requireAuth, putTask);
router.delete("/:id", requireAuth, deleteTask);

export default router;

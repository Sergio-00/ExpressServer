import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getTasks,
  createTask,
  putTask,
  deleteTask,
} from "../controllers/tasks.controller.js";
import express from "express";
const router = express.Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.put("/:id", putTask);
router.delete("/:id", deleteTask);

export default router;

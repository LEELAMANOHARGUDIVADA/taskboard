import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createTask, deleteTask, updateTask, updateTaskPriority } from "../controllers/TaskController.js";

const router = Router();

router.post("/create-task", authMiddleware, createTask);
router.post("/update-task-priority/:id", authMiddleware, updateTaskPriority);
router.put("/update-task/:id", authMiddleware, updateTask);
router.delete("/delete-task/:id/:projectId", authMiddleware, deleteTask);

export default router;
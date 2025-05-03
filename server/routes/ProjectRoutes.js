import { Router } from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import { createProject, deleteProject, getProject, getUserProjects } from "../controllers/ProjectController.js";

const router = Router();

router.post("/create-project", authMiddleware, createProject);
router.get("/userProjects", authMiddleware, getUserProjects);
router.get("/:id", authMiddleware, getProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;
import { Router } from "express";
import {  Login, Register } from "../controllers/UserController.js";

const router = Router();

router.post("/register", Register);
router.post("/login", Login);

export default router;
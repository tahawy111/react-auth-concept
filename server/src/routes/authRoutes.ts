import { Router } from "express";
import authController from "../controllers/authController";

const router = Router();

router.post("/login", authController.login);
router.get("/refreshToken", authController.refreshToken);
router.get("/setToken", authController.setToken);

export default router;

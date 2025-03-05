import { Router } from "express";
import authController from "../controllers/authController.js";
import authenticateToken from "../middleware/authenticateToken.js";
const authRouter = Router();

authRouter.post("/register", authController.criarUser);
authRouter.post("/login", authController.realizaLogin);
authRouter.get("/me", authenticateToken, authController.me);

export default authRouter;

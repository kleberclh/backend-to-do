import { Router } from "express";
import authController from "../controllers/authController.js";
// import authenticateToken from "../middleware/authenticateToken.js";
const authRouter = Router();

authRouter.post("/criar", authController.criarUser);
authRouter.post("/login", authController.realizaLogin);

export default authRouter;

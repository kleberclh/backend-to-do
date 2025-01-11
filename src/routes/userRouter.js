import { Router } from "express";

import userController from "../controllers/userController.js";

const userRouter = Router();

userRouter.get("/listar", userController.listaUsuarios);
userRouter.get("/listar/:id", userController.listaUmUsuario);
userRouter.put("/editar/:id", userController.editarUmUsuario);

export default userRouter;

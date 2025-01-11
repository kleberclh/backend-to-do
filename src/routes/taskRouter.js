import { Router } from "express";
import taskController from "../controllers/taskController.js";
import authenticateToken from "../middleware/authenticateToken .js";
const taskRouter = Router();

taskRouter.post("/tarefa", authenticateToken, taskController.criarTarefa);
taskRouter.put("/tarefa/:id", authenticateToken, taskController.editarTarefa);
taskRouter.put(
  "/tarefa/:id/concluir",
  authenticateToken,
  taskController.atualizarTarefaConcluida
);
taskRouter.delete(
  "/tarefa/:id",
  authenticateToken,
  taskController.deletarTarefa
);

export default taskRouter;

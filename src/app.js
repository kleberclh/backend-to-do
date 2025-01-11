import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
import taskRouter from "./routes/taskRouter.js";

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Express API!");
});

// Define rotas para autenticação e usuários
app.use(authRouter);

// Define rotas para usuários
app.use(userRouter);

// Define rotas para tarefas
app.use(taskRouter);

export default app;

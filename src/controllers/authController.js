import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { senhaCriptografada } from "../repositories/criptografarSenha.js";
async function criarUser(req, res) {
  try {
    const { nome, senha, email } = req.body;

    const verificaEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (verificaEmail) {
      return res
        .status(409)
        .json({ message: "Já existe um usuário com este e-mail" });
    }

    const senhaCripto = await senhaCriptografada(senha);

    const newUser = await prisma.user.create({
      data: {
        nome,
        senha: senhaCripto,
        email,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function realizaLogin(req, res) {
  try {
    const { email, senha } = req.body;
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res
        .status(401)
        .json({ message: "E-mail ou senha incorretos n existe" });
    }
    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res
        .status(401)
        .json({ message: "E-mail ou senha incorretos senha" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET, {
      expiresIn: "10d",
    });
    res.json({
      message: "Login efetuado com sucesso",
      token,
      id: user.id,
      nome: user.nome,
      email: user.email,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function me(req, res) {
  try {
    const id = req.user.id; // Obtém o ID do usuário a partir do token JWT

    const user = await prisma.user.findUnique({
      where: { id }, // Obtém o usuário pelo ID do token
      include: {
        tarefas: true, // Inclui as tarefas associadas ao usuário
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Usuário não encontrado
    }

    res.json(user); // Retorna os dados do usuário, incluindo as tarefas
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message }); // Retorna erro em caso de falha
  }
}
export default {
  criarUser,
  realizaLogin,
  me,
};

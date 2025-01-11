import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function listaUsuarios(req, res) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor, tente mais tarde!" });
  }
}
async function listaUmUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor, tente mais tarde!" });
  }
}
async function editarUmUsuario(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { nome, email, senha } = req.body;
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado" });
    }
    const atualizaUsuario = { nome, email };
    if (senha) {
      atualizaUsuario.senha = await senhaCriptografada(senha);
    }
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: atualizaUsuario,
      select: {
        id: true,
        nome: true,
        email: true,
      },
    });
    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro interno do servidor, tente mais tarde!" });
  }
}

export default {
  listaUsuarios,
  listaUmUsuario,
  editarUmUsuario,
};

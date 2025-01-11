import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function criarTarefa(req, res) {
  try {
    const { titulo } = req.body;
    const userId = req.user.id;

    const novaTarefa = await prisma.tarefas.create({
      data: {
        titulo,
        userId,
      },
    });
    res.status(201).json(novaTarefa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function editarTarefa(req, res) {
  try {
    //O ID É PARA ACHAR O ID DA TAREFA
    const id = parseInt(req.params.id);
    const { titulo } = req.body;
    const userId = req.user.id;

    // Usando findFirst para buscar a tarefa do usuário
    const tarefa = await prisma.tarefas.findFirst({
      where: {
        id,
        userId,
      },
      select: { id: true },
    });

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    const tarefaAtualizada = await prisma.tarefas.update({
      where: {
        id,
      },
      data: {
        titulo,
      },
    });

    res.json(tarefaAtualizada);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function atualizarTarefaConcluida(req, res) {
  try {
    const id = parseInt(req.params.id);
    const { concluida } = req.body;
    const userId = req.user.id;

    const tarefa = await prisma.tarefas.findFirst({
      where: {
        id, // Certifica-se de que o ID é um número
        userId, // Verifica se a tarefa pertence ao usuário
      },
    });

    if (!tarefa) {
      return res.status(404).json({ message: "Tarefa não encontrada" });
    }

    // Atualiza o status de 'concluida' da tarefa
    const tarefaAtualizada = await prisma.tarefas.update({
      where: {
        id,
      },
      data: {
        concluida,
        data_conclusao: concluida ? new Date() : null,
      },
    });

    res.json({
      message: "Tarefa atualizada com sucesso",
      tarefa: tarefaAtualizada,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export default {
  criarTarefa,
  editarTarefa,
  atualizarTarefaConcluida,
};

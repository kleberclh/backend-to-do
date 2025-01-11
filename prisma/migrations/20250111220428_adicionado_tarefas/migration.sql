-- CreateTable
CREATE TABLE "Tarefas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "concluida" BOOLEAN NOT NULL DEFAULT false,
    "data_criacao" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_atualizacao" DATETIME NOT NULL,
    "data_conclusao" DATETIME,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Tarefas_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

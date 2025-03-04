# Backend To-Do

## Descrição
Este é um backend para um aplicativo de lista de tarefas (To-Do), desenvolvido com Node.js, Express e Prisma ORM.

## Tecnologias Utilizadas
- Node.js
- Express.js
- Prisma ORM
- JSON Web Token (JWT)
- bcrypt para criptografia de senhas

## Estrutura do Projeto

```
backend-to-do/
|-- prisma/
|   |-- migrations/
|   |-- dev.db
|   |-- schema.prisma
|
|-- src/
|   |-- controllers/
|   |   |-- authController.js
|   |   |-- taskController.js
|   |   |-- userController.js
|   |
|   |-- middleware/
|   |   |-- authenticateToken.js
|   |
|   |-- repositories/
|   |   |-- criptografarSenha.js
|   |
|   |-- routes/
|   |   |-- authRouter.js
|   |   |-- taskRouter.js
|   |   |-- userRouter.js
|
|-- app.js
|-- server.js
|-- .env
|-- .gitignore
|-- package.json
|-- package-lock.json
|-- vercel.json
```

## Instalação

1. Clone este repositório:
   ```sh
   git clone https://github.com/kleberclh/backend-to-do.git
   ```

2. Acesse o diretório do projeto:
   ```sh
   cd backend-to-do
   ```

3. Instale as dependências:
   ```sh
   npm install
   ```

4. Configure o arquivo `.env` com as variáveis de ambiente necessárias.

5. Execute as migrações do Prisma:
   ```sh
   npx prisma migrate dev
   ```

6. Inicie o servidor:
   ```sh
   npm start
   ```

## Rotas da API

### Autenticação
- `POST /register` - Cria um novo usuário
- `POST /login` - Realiza login e retorna um token JWT

### Usuários (`/users`)
- `GET /listar` - Retorna todos os usuários (requer autenticação)
- `GET /listar/:id` - Retorna um usuário específico
- `PUT /editar/:id` - Atualiza um usuário


### Tarefas (`/tasks`)
- `POST /tarefa` - Cria uma nova tarefa
- `PUT /tarefa/:id` - Atualiza uma tarefa
- `DELETE /tarefa/:id` - Exclui uma tarefa

## Middleware
- `authenticateToken.js` - Middleware para verificar JWT em rotas protegidas

## Licença
Este projeto está licenciado sob a [MIT License](LICENSE).


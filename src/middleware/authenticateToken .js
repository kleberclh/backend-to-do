// Importa o módulo 'jsonwebtoken', usado para verificar e decodificar tokens JWT.
import jwt from "jsonwebtoken";

// Middleware para autenticação de tokens JWT.
const authenticateToken = (req, res, next) => {
  // Obtém o cabeçalho de autorização da solicitação.
  const authHeader = req.headers.authorization;

  // Extrai o token do cabeçalho de autorização.
  // O formato esperado é 'Bearer <token>'.
  const token = authHeader && authHeader.split(" ")[1];

  // Verifica se o token foi fornecido.
  // Se não houver token, retorna um erro 401 (Não autorizado).
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verifica a validade do token usando o segredo armazenado em variáveis de ambiente.
  // Se o token for inválido, retorna um erro 403 (Proibido).
  jwt.verify(token, process.env.SECRET, (err, user) => {
    // Se houve um erro na verificação do token, retorna um erro 403.
    if (err) {
      return res.status(403).json({ message: "Failed to authenticate token" });
    }

    // Se o token for válido, adiciona o usuário decodificado ao objeto de solicitação.
    req.user = user;

    // Chama o próximo middleware ou a rota.
    next();
  });
};

// Exporta o middleware para ser usado em outras partes da aplicação.
export default authenticateToken;

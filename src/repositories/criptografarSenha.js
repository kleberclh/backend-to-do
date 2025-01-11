import { hash } from "bcrypt";

export const senhaCriptografada = async (senha) => {
  const saltos = 8;
  const senhaCripto = await hash(senha, saltos);
  return senhaCripto;
};

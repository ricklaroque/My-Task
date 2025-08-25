import { PrismaClient } from "@prisma/client"
import { Router } from "express"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()
const router = Router()

router.post("/", async (req, res) => {
  const { email, senha } = req.body ?? {};
  const mensaPadrao = "Login ou senha incorretos";

  if (!email || !senha) {
    return res.status(400).json({ erro: mensaPadrao });
  }

  try {
    const usuario = await prisma.usuario.findUnique({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ erro: mensaPadrao });
    }

    const ok = await bcrypt.compare(senha, usuario.senha);
    if (!ok) {
      // tenta gravar o log, mas sem afetar a resposta
      (async () => {
        try {
          await prisma.log.create({
            data: {
              descricao: "Tentativa de acesso ao sistema",
              complemento: `Usuário: ${usuario.id} - ${usuario.nome}`,
              usuarioId: usuario.id,
            },
          });
        } catch (e) {
          console.warn("Falha ao gravar log:", e);
        }
      })();

      return res.status(401).json({ erro: mensaPadrao });
    }

    if (!process.env.JWT_KEY) {
      console.error("JWT_KEY não definida");
      return res.status(500).json({ erro: "Falha de configuração do servidor" });
    }

    const token = jwt.sign(
      { userLogadoId: usuario.id,
        userLogadoNome: usuario.nome },
        process.env.JWT_KEY,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      token,
    });
  } catch (error) {
    console.error("Erro no login:", error);
    const msg = error instanceof Error ? error.message : "Erro interno";
    return res.status(500).json({ erro: msg });
  }
});



export default router
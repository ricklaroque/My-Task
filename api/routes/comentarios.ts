import { PrismaClient, Motivos } from "@prisma/client";
import { Router } from "express";
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router();

const comentarioSchema = z.object({
    conteudo: z.string().min(1,
        { message: "Comentários devem ter pelo menos 1 caractere." }
    ),
    taskId: z.coerce.number().int().positive(),
})


router.get("/", async (req, res) => {
    try {
        const comentarios = await prisma.board.findMany({
            include: {
                usuario: true,
            }
        })
        res.status(200).json(comentarios)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})

router.post("/", async (req, res) => {
    const valida = comentarioSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }
    const { conteudo, taskId } = valida.data
    try {
        const comentario = await prisma.comentario.create({
            data: { conteudo, taskId },
        });
        res.status(201).json(comentario)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const comentario = await prisma.comentario.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(comentario)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params

    const valida = comentarioSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }
    const { conteudo, taskId } = valida.data

    try {
        const comentario = await prisma.comentario.update({
            where: { id: Number(id) },
            data: {
                conteudo, taskId
            }
        })
        res.status(200).json(comentario)
    } catch (error) {
        res.status(400).json({ error })
    }
})

export default router
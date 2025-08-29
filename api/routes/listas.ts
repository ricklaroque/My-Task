import { PrismaClient, Motivos } from "@prisma/client";
import { Router } from "express";
import { z } from 'zod'

const prisma = new PrismaClient()
const router = Router();

const listaSchema = z.object({
    titulo: z.string().min(1,
        { message: "Nome da lista deve ter pelo menos 1 caractere." }),
    ordem: z.coerce.number(),
    boardId: z.coerce.number().int().positive(),
})


router.get("/", async (req, res) => {
    try {
        const listas = await prisma.lista.findMany({
            include: {
                board: true,
            }
        })
        res.status(200).json(listas)
    } catch (error) {
        res.status(500).json({ erro: error })
    }
})


router.post("/", async (req, res) => {
    const valida = listaSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }
    const { titulo, ordem, boardId } = valida.data
    try {
        const lista = await prisma.lista.create({
            data: { titulo, ordem, boardId },
        });
        res.status(201).json(lista)
    } catch (error) {
        res.status(400).json({ error })
    }
})


router.put("/:id", async (req, res) => {
    const { id } = req.params

    const valida = listaSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }
    const { titulo, ordem, boardId } = valida.data

    try {
        const lista = await prisma.lista.update({
            where: { id: Number(id) },
            data: {
                titulo, ordem, boardId
            }
        })
        res.status(200).json(lista)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try {
        const lista = await prisma.lista.delete({
            where: { id: Number(id) }
        })
        res.status(200).json(lista)
    } catch (error) {
        res.status(400).json({ erro: error })
    }
})

router.get("/lista/:termo", async (req, res) => {
    const { termo } = req.params
    const termoNumero = Number(termo)

    if (isNaN(termoNumero)) {
        try {
            const listas = await prisma.lista.findMany({
                include: {
                    board: true,
                },
                where: {
                    OR: [
                        { titulo: { contains: termo, mode:"insensitive" }},
                        { board: { titulo: { equals: termo, mode:"insensitive" }} }
                    ]
                }
            })
            res.status(200).json(listas)
        } catch(error) {
            res.status(500).json({ erro: error })
        }
    } 
})


export default router
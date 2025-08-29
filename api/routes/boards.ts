import { PrismaClient, Motivos } from "@prisma/client";
import { Router } from "express";
import { z }  from 'zod'
import { asyncHandler } from "../utils/http";

const prisma = new PrismaClient()
const router = Router();

const boardSchema = z.object({
    titulo: z.string().min(1, 
        { message: "Nome do board deve ter pelo menos 1 caractere."}),
    motivo: z.nativeEnum(Motivos),
    usuarioId: z.string(),
    adminId: z.coerce.number().int().positive().optional(),
})

router.get("/", asyncHandler(async (_req, res) => {
    const comentarios = await prisma.board.findMany({
        include: {
            usuario: true
        }
    })
    res.status(200).json(comentarios)
}))

// router.get("/", async (req, res) => {
//     try{
//         const boards = await prisma.board.findMany({
//             include: {
//                 usuario: true,
//             }
//         })
//         res.status(200).json(boards)
//     } catch (error){
//         res.status(500).json({ erro: error})
//     }
// })

router.post("/", async (req, res) => {
    const valida = boardSchema.safeParse(req.body)
    if(!valida.success){
        res.status(400).json({ erro: valida.error })
        return
    }
    const { titulo, motivo, usuarioId } = valida.data
    try {
        const board = await prisma.board.create({
            data: { titulo, motivo, usuarioId },
        });
        res. status(201).json(board)
    } catch (error) {
        res.status(400).json({ error })
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params

    const valida = boardSchema.safeParse(req.body)
    if (!valida.success) {
        res.status(400).json({ erro: valida.error })
        return
    }
    const { titulo, motivo, usuarioId } = valida.data

    try{
    const board = await prisma.board.update({
      where: { id: Number(id) },
      data: {
       titulo, motivo, usuarioId
      }
    })
    res.status(200).json(board)
  } catch (error) {
    res.status(400).json({ error })
  }
})

router.delete("/:id", async (req, res) => {
    const { id } = req.params

    try{
        const board = await prisma.board.delete({
            where: { id: Number(id)}
        })
        res.status(200).json(board)
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
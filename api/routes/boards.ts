import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const boardSchema = z.object({
  titulo: z.string().min(1, { message: 'Título obrigatório' }),
  usuarioId: z.string().uuid({ message: 'usuarioId deve ser UUID' }),
  motivo: z.enum(['TRABALHO', 'ESTUDO', 'PESSOAL', 'OUTRO']),
});

// LISTAR TODOS OS BOARDS (com listas básicas)
router.get('/', async (_req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: {
        listas: {
          select: { id: true, titulo: true, ordem: true, boardId: true },
          orderBy: { ordem: 'asc' },
        },
      },
      orderBy: { id: 'asc' },
    });
    res.status(200).json(boards);
  } catch (error) {
    console.error('ERRO GET /boards:', error);
    res.status(500).json({ erro: 'Falha ao listar boards.' });
  }
});

// O BOARD + SUAS LISTAS (para abrir a página do board)
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    return res.status(400).json({ erro: 'id inválido' });
  }
  try {
    const board = await prisma.board.findUnique({
      where: { id },
      include: {
        listas: {
          orderBy: { ordem: 'asc' },
          include: {
            // se quiser já vir com qtd de tasks no futuro:
            // _count: { select: { task: true } }
          },
        },
      },
    });
    if (!board) return res.status(404).json({ erro: 'Board não encontrado.' });
    res.status(200).json(board);
  } catch (error) {
    console.error('ERRO GET /boards/:id', error);
    res.status(500).json({ erro: 'Falha ao buscar board.' });
  }
});

// CRIAR BOARD
router.post('/', async (req, res) => {
  const valida = boardSchema.safeParse(req.body);
  if (!valida.success) {
    return res.status(400).json({ erro: valida.error.format() });
  }
  const { titulo, motivo, usuarioId } = valida.data;
  try {
    const novo = await prisma.board.create({
      data: { titulo, motivo, usuarioId },
    });
    res.status(201).json(novo);
  } catch (error) {
    console.error('ERRO POST /boards', error);
    res.status(400).json({ erro: 'Erro ao criar board.' });
  }
});

// ATUALIZAR BOARD
router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: 'id inválido' });

  const valida = boardSchema.partial().safeParse(req.body);
  if (!valida.success) {
    return res.status(400).json({ erro: valida.error.format() });
  }

  try {
    const upd = await prisma.board.update({
      where: { id },
      data: valida.data,
    });
    res.status(200).json(upd);
  } catch (error) {
    console.error('ERRO PUT /boards/:id', error);
    res.status(400).json({ erro: 'Erro ao atualizar board.' });
  }
});

// DELETAR BOARD
router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: 'id inválido' });
  try {
    const del = await prisma.board.delete({ where: { id } });
    res.status(200).json(del);
  } catch (error) {
    console.error('ERRO DELETE /boards/:id', error);
    res.status(400).json({ erro: 'Erro ao deletar board.' });
  }
});

export default router;

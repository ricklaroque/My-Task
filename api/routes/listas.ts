import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import { z } from 'zod';

const prisma = new PrismaClient();
const router = Router();

const listaSchema = z.object({
  titulo: z.string().min(1, { message: 'Nome da lista deve ter pelo menos 1 caractere.' }),
  boardId: z.coerce.number().int().positive(),
  
});

router.get('/', async (_req, res) => {
  try {
    const listas = await prisma.lista.findMany({
      include: { board: true },
      orderBy: [{ boardId: 'asc' }],
    });
    res.status(200).json(listas);
  } catch (error) {
    console.error('ERRO GET /listas', error);
    res.status(500).json({ erro: 'Falha ao listar listas.' });
  }
});

router.get('/:id/tasks', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: 'id inválido' });
  try {
    const lista = await prisma.lista.findUnique({
      where: { id },
      include: { tasks: true },
    });
    if (!lista) return res.status(404).json({ erro: 'Lista não encontrada.' });
    res.status(200).json(lista.tasks);
  } catch (error) {
    console.error('ERRO GET /listas/:id/tasks', error);
    res.status(500).json({ erro: 'Falha ao buscar tasks da lista.' });
  }
})


router.post('/', async (req, res) => {
  const valida = listaSchema.safeParse(req.body);
  if (!valida.success) {
    return res.status(400).json({ erro: valida.error.format() });
  }
  const { titulo, boardId } = valida.data;
  try {
    const nova = await prisma.lista.create({
      data: { titulo, boardId },
    });
    res.status(201).json(nova);
  } catch (error) {
    console.error('ERRO POST /listas', error);
    res.status(400).json({ erro: 'Erro ao criar lista.' });
  }
});

router.put('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: 'id inválido' });

  const valida = listaSchema.safeParse(req.body);
  if (!valida.success) {
    return res.status(400).json({ erro: valida.error.format() });
  }
  const { titulo, boardId } = valida.data;

  try {
    const upd = await prisma.lista.update({
      where: { id },
      data: { titulo, boardId },
    });
    res.status(200).json(upd);
  } catch (error) {
    console.error('ERRO PUT /listas/:id', error);
    res.status(400).json({ erro: 'Erro ao atualizar lista.' });
  }
});

router.delete('/:id', async (req, res) => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) return res.status(400).json({ erro: 'id inválido' });
  try {
    const del = await prisma.lista.delete({ where: { id } });
    res.status(200).json(del);
  } catch (error) {
    console.error('ERRO DELETE /listas/:id', error);
    res.status(400).json({ erro: 'Erro ao deletar lista.' });
  }
});

router.get('/lista/:termo', async (req, res) => {
  const { termo } = req.params;
  if (Number.isNaN(Number(termo))) {
    try {
      const listas = await prisma.lista.findMany({
        include: { board: true },
        where: {
          OR: [
            { titulo: { contains: termo, mode: 'insensitive' } },
            { board: { titulo: { equals: termo, mode: 'insensitive' } } },
          ],
        },
      });
      return res.status(200).json(listas);
    } catch (error) {
      console.error('ERRO GET /listas/lista/:termo', error);
      return res.status(500).json({ erro: 'Falha na busca.' });
    }
  }
  return res.status(400).json({ erro: 'Use /by-board/:boardId para listar por board.' });
});

export default router;

import { create } from "zustand";
import type { BoardType } from "../utils/BoardType";

type BoardState = {
  board: BoardType | null;

  setBoard: (board: BoardType) => void;
  clearBoard: () => void;
  updateTitulo: (titulo: string) => void;
  updateMotivo: (motivo: string) => void;

  fetchBoardById: (id: string | number) => Promise<void>;
};

const apiUrl = import.meta.env.VITE_API_URL;

export const useBoardStore = create<BoardState>((set, get) => ({
  board: null,

  setBoard: (board) => set({ board }),
  clearBoard: () => set({ board: null }),

  updateTitulo: (titulo) =>
    set((s) => (s.board ? { board: { ...s.board, titulo } } : s)),
  updateMotivo: (motivo) =>
    set((s) => (s.board ? { board: { ...s.board, motivo } } : s)),

  fetchBoardById: async (id) => {
    const resp = await fetch(`${apiUrl}/boards/${id}`);
    if (!resp.ok) throw new Error("Falha ao buscar board");
    const data: BoardType = await resp.json();
    set({ board: data });
  },
}));

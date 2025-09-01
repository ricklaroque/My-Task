// import type { UsuarioType } from "./UsuarioType";
import { create } from "zustand";

export type BoardType = {
    id: number
    titulo: string
    motivo: string
    usuarioId: string
    createdAt?: string;
    updatedAt?: string;
    listas?: {
    id: number;
    titulo: string;
    tarefasTotal?: number;
    tarefasConcluidas?: number;
  }[];
  progresso?: number; 
};


type BoardState = {
  boards: BoardType[];
  addBoard: (board: BoardType) => void;
}

const useBoardStore = create<BoardState>((set) => ({
  boards: [],

  addBoard: (board) => {
    set(state => ({ boards: [...state.boards, board]}))
  }
}));

export default useBoardStore;
import { create } from "zustand";
import type { BoardType } from "../utils/BoardType";

type BoardStore = {
    boards: BoardType[]
    boardSelecionado: BoardType | null
    carregarBoards: (boardsCarregados: BoardType[]) => void
    selecionarBoard: (board: BoardType) => void
    adicionarBoard: (novoBoard: BoardType) => void
    atualizarBoard: (boardAtualizado: BoardType) => void
    removerBoard: (boardId: number) => void
    limparBoards: () => void
}

export const useBoardStore = create<BoardStore>((set) => ({
    boards: [],
    boardSelecionado: null,
    carregarBoards: (boardsCarregados) => set({ boards: boardsCarregados }),
    selecionarBoard: (board) => set({ boardSelecionado: board }),
    adicionarBoard: (novoBoard) => set((state) => ({
        boards: [...state.boards, novoBoard]
    })),
    atualizarBoard: (boardAtualizado) => set((state) => ({
        boards: state.boards.map(board => 
            board.id === boardAtualizado.id ? boardAtualizado : board
        )
    })),
    removerBoard: (boardId) => set((state) => ({
        boards: state.boards.filter(board => board.id !== boardId)
    })),
    limparBoards: () => set({ boards: [], boardSelecionado: null })
}))

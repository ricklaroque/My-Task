import type { UsuarioType } from "../utils/UsuarioType";
import { create } from 'zustand'

type UsuarioBoard = {
    usuario: UsuarioType
    logaUsuario: (usuarioLogado: UsuarioType) => void
    deslogaUsuario: () => void
}

export const useUsuarioBoard = create<UsuarioBoard>
((set) => ({
    usuario: {} as UsuarioType,
    logaUsuario: (usuarioLogado) => set ({usuario: usuarioLogado}),
    deslogaUsuario: () => set({usuario: {} as UsuarioType})
}))


import type { UsuarioType } from '../utils/UsuarioType'
import { create } from 'zustand'

type UsuarioStore = {
    usuario: UsuarioType
    logaUsuario: (usuarioLogado: UsuarioType) => void
    deslogaUsuario: () => void
}

export const useUsuarioStore = create<UsuarioStore>((set) => ({
    usuario: {} as UsuarioType,
    logaUsuario: (usuarioLogado) => set({usuario: usuarioLogado}),
    deslogaUsuario: () => set({usuario: {} as UsuarioType})
}))


// import type { UsuarioType } from "../utils/UsuarioType";
// import { create } from 'zustand'

// type UsuarioStore = {
//     usuario: UsuarioType | null
//     logaUsuario: (usuarioLogado: UsuarioType) => void
//     deslogaUsuario: () => void
//     verificarUsuarioSalvo: () => void
// }

// export const useUsuarioStore = create<UsuarioStore>((set, get) => ({
//     usuario: null,
    
//     logaUsuario: (usuarioLogado) => {
//         set({ usuario: usuarioLogado })
//         // Salva no localStorage para persistir
//         localStorage.setItem("usuarioLogado", JSON.stringify(usuarioLogado))
//     },
    
//     deslogaUsuario: () => {
//         set({ usuario: null })
//         localStorage.removeItem("usuarioLogado")
//         localStorage.removeItem("usuarioKey")
//     },
    
//     verificarUsuarioSalvo: () => {
//         const usuarioSalvo = localStorage.getItem("usuarioLogado")
//         if (usuarioSalvo) {
//             try {
//                 const usuario = JSON.parse(usuarioSalvo)
//                 set({ usuario })
//             } catch (error) {
//                 console.error("Erro ao recuperar usuário do localStorage:", error)
//                 localStorage.removeItem("usuarioLogado")
//             }
//         }
//     }
// }))
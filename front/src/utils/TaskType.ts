import type { ListaType } from "./ListaType";
import type { UsuarioType } from "./UsuarioType";

export type TaskType = {
    id: number
    titulo: string
    descricao: string
    prazo: string
    listaId: string
    usuarioId: string
}
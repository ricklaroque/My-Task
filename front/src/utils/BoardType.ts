import type { UsuarioType } from "./UsuarioType";

export type BoardType = {
    id: number
    titulo: string
    motivo: string
    usuarioId: UsuarioType
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

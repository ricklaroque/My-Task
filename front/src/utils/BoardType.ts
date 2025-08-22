import type { UsuarioType } from "./UsuarioType";

export type BoardType = {
    id: string | number
    titulo: string
    motivo: "TRABALHO" | "ESTUDO" | "PESSOAL" | "OUTRO"
    usuarioId: UsuarioType
    createdAt?: string;
    updatedAt?: string;
    listas?: {
    id: string | number;
    titulo: string;
    tarefasTotal?: number;
    tarefasConcluidas?: number;
  }[];
  progresso?: number; 
};

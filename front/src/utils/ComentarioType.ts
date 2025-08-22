import type { TaskType } from "./TaskType";

export type ComentarioType = {
    id: number
    conteudo: string
    taskId: TaskType
}
export type ListaType = {
    id: number
    titulo: string
    ordem: number
    boardId: number
    tasks?: {
        id: number
        titulo: string
        descricao: string
        prazo:string
    }[];
}
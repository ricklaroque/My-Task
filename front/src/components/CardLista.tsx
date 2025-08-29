import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ListaType } from "../utils/ListaType";
import type { BoardType } from "../utils/BoardType";
import Modal from "react-responsive-modal";
import type { TaskType } from "../utils/TaskType";
const apiUrl = import.meta.env.VITE_API_URL

export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const { taskId } = useParams<{ taskId: string }>();
    const [listas, setListas] = useState<ListaType[]>([])
    const [board, setBoard] = useState<BoardType | null>(null)
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        async function buscaDados() {
            if (!boardId) { setLoading(false); return };
            try {
                const responseBoard = await fetch(`${apiUrl}/boards/${boardId}`)
                const dadosBoard = await responseBoard.json()
                setBoard(dadosBoard)
                setListas(dadosBoard.listas ?? []);
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            } finally {
                setLoading(false)
            }
        }
        buscaDados()
    }, [boardId])

    if (loading) return <div>Carregando...</div>
    if (!board) return <div>Board não encontrado</div>

    const listasMap = listas.map(lista => (
        <div key={lista.id} className="p-4 rounded-lg shadow text-center w-[15rem] pb-[15rem] bg-gray-500">
            <div className="flex justify-between">
                <h2 className="text-lg font-semibold bg-blue-400/40 rounded-lg border-black border w-[11rem]">{lista.titulo}</h2>
                <button className="bg-white rounded-[5rem] py-[0.2rem] px-[0.5rem]">+</button>
            </div>
        </div>
    ))

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Board: {board.titulo}</h1>
            <div className="flex gap-4 ">
                {listasMap}
            </div>

        </div>
    )
}
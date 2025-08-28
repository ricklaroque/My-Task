import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { ListaType } from "../utils/ListaType";
import type { BoardType } from "../utils/BoardType";
const apiUrl = import.meta.env.VITE_API_URL

export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const [listas, setListas] = useState<ListaType[]>([])
    const [board, setBoard] = useState<BoardType | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function buscaDados() {
            if (!boardId) return;
            try {
                const responseBoard = await fetch(`${apiUrl}/boards/${boardId}`)
                const responseLista = await fetch(`${apiUrl}/listas/${boardId}`)
                const dadosBoard = await responseBoard.json()
                const dadosLista = await responseLista.json()
                setBoard(dadosBoard)
                setListas(dadosLista)
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
        <div key={lista.id} className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold">{lista.titulo}</h2>
        </div>
    ))

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Board: {board.titulo}</h1>
            <div className="grid gap-4">
                {listasMap.length > 0 ? listasMap : <p>Nenhuma lista encontrada</p>}
            </div>
        </div>
    )
}
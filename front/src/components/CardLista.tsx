import { useState, useEffect } from "react";
import type { ListaType } from "../utils/ListaType";
import type { BoardType } from "../utils/BoardType";
const apiUrl = import.meta.env.VITE_API_URL

export default function CardLista({ data, dataLista }: { data: BoardType, dataLista: ListaType }) {
    const [listas, setListas] = useState<ListaType[]>([])
    const [boards, setBoards] = useState<BoardType[]>([])

    useEffect(() => {
        async function buscaDados() {
            const responseBoard = await fetch(`${apiUrl}/boards/${data.id}`)
            const responseLista = await fetch(`${apiUrl}/listas/${data.id}`)
            const dadosBoard = await responseBoard.json()
            const dadosLista = await responseLista.json()
            setBoards(dadosBoard)
            setListas(dadosLista)
        }
        buscaDados()
    }, [])

    const listasMap = listas.map(lista => (
        <div key={lista.id}>
            <h2>{lista.titulo}</h2>
        </div>
    ))
    const boardsMap = boards.map(board => (
        <div key={board.id}>
            <h2>{board.titulo}</h2>
        </div>
    ))

    return (
        <>
            <div>
                {boardsMap}
                <p>teste</p>
                {listasMap}
            </div>
        </>
    )
}
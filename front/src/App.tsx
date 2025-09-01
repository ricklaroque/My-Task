import type { BoardType } from "./utils/BoardType";
import { useEffect, useState } from "react";
import { CardBoard } from "./components/CardBoard";
import { useBoardStore } from "./context/BoardContext";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const boards = useBoardStore(s => s.boards);
  const [loading, setLoading] = useState(true)
  const carregarBoards = useBoardStore(s => s.carregarBoards)

  useEffect(() => {
    async function buscaDados() {
      try{
      const response = await fetch(`${apiUrl}/boards`)
      const dados:BoardType[] = await response.json()
      carregarBoards(dados)
      } finally {
        setLoading(false)
      }
    }
    buscaDados()
  }, [carregarBoards])

  if (loading) return <div>Carregando...</div>
  return (
    <div className="grid grid-cols-3 gap-6 justify-items-center p-[2rem]">
      {boards.map(board => (
        <CardBoard data={board} key={board.id}/>
      ))}
    </div>
  );
}

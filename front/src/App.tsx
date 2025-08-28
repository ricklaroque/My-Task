import type { BoardType } from "./utils/BoardType";
import { useEffect, useState } from "react";
import { CardBoard } from "./components/CardBoard";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [boards, setBoards] = useState<BoardType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function buscaDados() {
      try{
      const response = await fetch(`${apiUrl}/boards`)
      const dados = await response.json()
      setBoards(dados)
      } finally {
        setLoading(false)
      }
    }
    buscaDados()
  }, [])

  if (loading) return <div>Carregando...</div>
  return (
    <div className="grid grid-cols-3 gap-6 justify-items-center p-[2rem]">
      {boards.map((board) => (
        <CardBoard data={board} key={board.id} />
      ))}
    </div>
  );
}

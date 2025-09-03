import type { BoardType } from "./utils/BoardType";
import { useEffect, useState } from "react";
import { CardBoard } from "./components/CardBoard";
import NewBoard from './components/NewBoard';


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

    const listaBoards = boards.map( board => (
      <CardBoard data={board} key={board.id} />
    ))

    const handleCreateBoard = () => {
  // Lógica para criar novo board
  console.log('Criando novo board...');
};

  if (loading) return <div>Carregando...</div>
  return (
  <div className="min-h-screen bg-gray-200 rounded-lg w-[80vw] mx-auto mt-2[rem]">
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 md:gap-4 place-items-stretch">
        {listaBoards}
<<<<<<< HEAD
        <NewBoard onClick={handleCreateBoard} />
=======
      </div>
>>>>>>> 3fe0f8e (Refactor: CardBoard/CardLista)
    </div>
  </div>
  )
}

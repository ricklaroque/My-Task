import type { BoardType } from "./utils/BoardType"
import { useEffect, useState } from "react"
import { CardBoard } from "./components/CardBoard"
import NewBoard from "./components/NewBoard"
import { useUsuarioStore } from "./context/UsuarioContext"

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [boards, setBoards] = useState<BoardType[]>([])
  const { logaUsuario } = useUsuarioStore()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function buscaBoards() {
      const response = await fetch(`${apiUrl}/boards`)
      const dados = await response.json()
      setBoards(dados)
      setLoading(false)
    }
    buscaBoards()
    async function buscaUsuario(id: string) {
      const response = await fetch(`${apiUrl}/usuarios/${id}`)
      const dados = await response.json()
      logaUsuario(dados)
    }
      if(localStorage.getItem("usuarioKey")){
        const idUsuario = localStorage.getItem("usuariokey")
        buscaUsuario(idUsuario as string)
      }
  }, [])

  const listaBoards = boards.map((board) => <CardBoard data={board} key={board.id} />)

  const handleCreateBoard = () => {
    console.log("Criando novo board...")
  }

  if (loading) return <div>Carregando...</div>

  return (
    <div className="min-h-screen bg-gray-200 rounded-lg w-[80vw] mx-auto mt-2[rem]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 md:gap-4 place-items-stretch">
          {listaBoards}
          <NewBoard onClick={handleCreateBoard} />
        </div>
      </div>
    </div>
  )
}

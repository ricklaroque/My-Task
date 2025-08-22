import { Calendar, MoreHorizontal, User } from "lucide-react";
import type { UsuarioType } from "./utils/UsuarioType";
import type { BoardType } from "./utils/BoardType";
import type { ComentarioType } from "./utils/ComentarioType";
import type { ListaType } from "./utils/ListaType";
import type { TaskType } from "./utils/TaskType";
// import { InputPesquisa } from "./components/InputPesquisa";
import { useEffect, useState } from "react";
import { CardBoard } from "./components/CardBoard";
CardBoard


const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [boards, setBoards] = useState<BoardType[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/boards`)
      const dados = await response.json()
//      console.log(dados)
      setBoards(dados)
    }
    buscaDados()
  }, [])

  const listaBoards = boards.map( board => (
    <CardBoard data={board} key={board.id} />
  ))

  return (
    <div className="w-full max-w-sm rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            titulo
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">descricao</p>
        </div>
        <button className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Categoria */}
      <span className="mt-2 inline-block rounded-md bg-black px-2 py-1 text-xs font-medium text-white">
        categoria
      </span>

      {/* Checklist */}
      {/* <ul className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
        {checklist.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <input type="checkbox" className="h-4 w-4 rounded border-gray-300" />
            {item}
          </li>
        ))}
      </ul> */}

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>data</span>
        </div>

        {/* <div className="flex items-center gap-2">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="User"
              className="h-6 w-6 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 dark:bg-gray-600">
              <User size={14} className="text-gray-600 dark:text-gray-300" />
            </div>
          )} */}
          <span>progresso%</span>
        </div>
      </div>
    
  );
}

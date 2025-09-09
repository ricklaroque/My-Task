import type { BoardType } from "./utils/BoardType";
import { useEffect, useState } from "react";
import { CardBoard } from "./components/CardBoard";
import NewBoard from './components/NewBoard';
import { useBoardStore } from "./context/BoardContext";
import { useUsuarioStore } from "./context/UsuarioContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function App() {
  // 🔽 lê da store (assina atualizações)
  const boards = useBoardStore(s => s.boards);
  const carregarBoards = useBoardStore(s => s.carregarBoards);
  const { logaUsuario } = useUsuarioStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`${apiUrl}/boards`);
        const dados: BoardType[] = await response.json();
        carregarBoards(dados);
      } finally {
        setLoading(false);
      }
    })();
  }, [carregarBoards]);



  useEffect(() => {
    async function buscaUsuario(id: String) {
      const response = await fetch(`${apiUrl}/usuarios/${id}`);
      const dados = await response.json();
      logaUsuario(dados)
    }
    if (localStorage.getItem("usuarioKey")) {
      const idUsuario = localStorage.getItem("usuarioKey")
      buscaUsuario(idUsuario as string)
    }
  }, [])




  const listaBoards = boards.map(board => (
    <CardBoard data={board} key={board.id} />
  ));

  const handleCreateBoard = () => {
    console.log('Criando novo board...');
  };

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="min-h-screen bg-gray-200 rounded-lg w-[80vw] mx-auto mt-2[rem]">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-3 md:gap-4 place-items-stretch">
          {listaBoards}
          <NewBoard onClick={handleCreateBoard} />
        </div>
      </div>
    </div>
  );
}

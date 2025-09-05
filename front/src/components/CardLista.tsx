// import type { ListaType } from "../utils/ListaType";
// import Modal from "react-responsive-modal";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";
import Modal from "../utils/Modal";
import { NovaTask } from "./CardTaskModal";
import { uselistaStore } from "../context/ListaContext";
import { usetaskStore } from "../context/TaskContext";
import NewBoard from "./NewBoard";
const apiUrl = import.meta.env.VITE_API_URL


export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<BoardType | null>(null)
    const [loading, setLoading] = useState(true)
    const [open, setOpen] = useState<boolean>(false)
    const { listas, carregarlistas, selecionarlista, listaSelecionado } = uselistaStore()
    const { tasks, carregartasks, selecionartask, taskSelecionado } = usetaskStore()

    useEffect(() => {
        async function buscaDados() {
            if (!boardId) { setLoading(false); return };
            try {
                const responseBoard = await fetch(`${apiUrl}/boards/${boardId}`)
                const dadosBoard = await responseBoard.json()
                setBoard(dadosBoard)
                carregarlistas(dadosBoard.listas ?? []);
            } catch (error) {
                console.error('Erro ao buscar dados:', error)
            } finally {
                setLoading(false)
            }
        }
        buscaDados()
    }, [boardId, carregarlistas])
    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [open]);

    if (loading) return <div>Carregando...</div>
    if (!board) return <div>Board não encontrado</div>

    const handleCreateBoard = () => {
        
        console.log('Criando novo board...');
    };

    const listasMap = listas.map(lista => (
        <div key={lista.id} className=" p-4 rounded-lg shadow w-[15rem] pb-[15rem] border-2 border-black ">
            <div className="flex flex-col items-center justify-center text-center ">
                <h2 className="hover:border-blue-500 hover:border-2 hover:text-blue-500 hover:bg-gray-300 text-lg font-semibold  rounded-lg border-black border w-[11.5rem] mb-[1rem]">{lista.titulo}</h2>
                <button
                    type="button"
                    onClick={() => {
                        selecionarlista(lista);
                        setOpen(true);
                    }}
                    className="bg-white rounded-[5rem] py-[0.2rem] px-[0.5rem] cursor-pointer hover:bg-gray-100 transition-colors font-bold "
                ><NewBoard onClick={handleCreateBoard} />
                </button>
            </div>
        </div>
    ))

    const tasksMap = tasks.map(task => (
        <div key={task.id} className="flex flex-col ">
            <div>
                <h1 className="text-red-600">{task.titulo}</h1>
                <h4>{task.descricao}</h4>
            </div>
            <p>{task.prazo}</p>
        </div>
    ))

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Board: {board.titulo}</h1>
            <div className="flex gap-4">
                <div className="flex gap-4">
                    {listasMap}
                    {tasksMap}
                </div>
                <Modal open={open} onClose={() => setOpen(false)}>
                    {listaSelecionado && (
                        <NovaTask
                            listaId={listaSelecionado.id}
                            usuarioId={String(board.usuarioId)}
                        />
                    )}
                </Modal>

            </div>
        </div>
    )
}
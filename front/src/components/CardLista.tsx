import { FaPencil } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";
import type { ListaType } from "../utils/ListaType";
import { Modal } from "./Modal";
import type { ComentarioType } from "../utils/ComentarioType";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<BoardType | null>(null);
    const [listas, setListas] = useState<ListaType[]>([]);
    const [comentarios, setComentarios] = useState<ComentarioType[]>([]);
    const [loading, setLoading] = useState(true);
    const [openTaskId, setOpenTaskId] = useState<number | null>(null);

    useEffect(() => {
        if (!boardId) return;
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/boards/${boardId}/listas/tasks`);
                const dados = await response.json();
                setBoard(dados);
                setListas(dados.listas ?? []);
                setComentarios(dados.comentarios ?? [])
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [boardId]);

    if (loading) return <div>Carregando…</div>;
    if (!board) return <div>Board não encontrado</div>;

    // useEffect(() => {
    //     if (openTaskId == null) {
    //         setComentarios([]);
    //         return
    //     }
    //     const taskAberta = listas.flatMap(l => l.tasks ?? []).find(t => t.id === openTaskId)
    //     setComentarios(taskAberta?.comentarios ?? []);
    // }, [])

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-[#3B82F6] border-[#3B82F6] border-b-2">{board.titulo}</h1>

            <div className="flex gap-4">
                {listas.map((lista) => (
                    <div key={lista.id} className="text-[#3B82F6] p-4 rounded-[8px] shadow w-[15rem] border-2 border-[#3B82F6]">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-3">{lista.titulo}</h2>
                            <FaPencil className="cursor-pointer" />
                        </div>
                        {(lista.tasks ?? []).length ? (
                            <ul className="space-y-2">
                                {(lista.tasks ?? []).map((t) => (
                                    <li key={t.id} className="text-[#3B82F6] rounded-[8px] border p-2">
                                        <div className="flex items-center">
                                            <input type="checkbox" className="cursor-pointer ml-[0.4rem]" />
                                            <button
                                                onClick={() => setOpenTaskId(t.id)}
                                                className="font-medium ml-[1rem] w-[8.5rem] cursor-pointer text-start"
                                            >

                                                {t.titulo}
                                            </button>
                                        </div>
                                        <Modal
                                            isOpen={openTaskId === t.id}
                                            onClose={() => setOpenTaskId(null)}
                                        >
                                            <div className=" max-w-[90vw] bg-white rounded-xl shadow-xl">
                                                <h1 className="text-2xl font-black leading-snug mb-2 border-b w-[54.9vw]">{lista.titulo}</h1>
                                                <div className="flex items-center justify-between py-3 ">
                                                    <h1 className="text-l font-bold">

                                                        {t.titulo}
                                                    </h1>
                                                </div>
                                                <div className="flex gap-6 ">
                                                    <div className="">
                                                        <div className="rounded-2xl border  p-5 w-[30rem] h-[18rem]">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
                                                                    <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                                                                    <path d="M7 9h10M7 13h10M7 17h6" stroke="currentColor" strokeWidth="2" />
                                                                </svg>
                                                                <h3 className="font-semibold">Descrição</h3>
                                                                <div className="ml-[17rem]">
                                                                    <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-white">
                                                                        Editar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                                {t?.descricao?.trim() ? t.descricao : "Sem descrição"}
                                                            </p>
                                                            {/* <input type="text" className="border-2 w-[27.3rem] h-[7rem] rounded-sm"/> */}
                                                            {(t as any)?.prazo && (
                                                                <div className="mt-4 flex items-center gap-2 text-sm">
                                                                    <span className="font-bold">Prazo para:</span>
                                                                    <span className="font-medium opacity-90">

                                                                        {new Date((t as any).prazo).toLocaleDateString("pt-BR", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <form className="rounded-2xl border  p-5 w-[30rem] h-[18rem]">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h2 className="font-semibold">Comentários e atividade</h2>
                                                            <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-white">
                                                                Enviar
                                                            </button>
                                                        </div>
                                                        <div className="flex items-start gap-3 mb-4">
                                                            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white grid place-items-center text-sm font-bold">
                                                                {("LF").slice(0, 2)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Escrever um comentário…"
                                                                    className="w-full rounded-md border px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </Modal>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-gray-500">Sem tasks</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

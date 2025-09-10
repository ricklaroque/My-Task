import { FaPencil } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";
import type { ListaType } from "../utils/ListaType";
import { Modal } from "./Modal";

const apiUrl = import.meta.env.VITE_API_URL;

export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<BoardType | null>(null);
    const [listas, setListas] = useState<ListaType[]>([]);
    const [loading, setLoading] = useState(true);

    // controla qual task está com modal aberto (ou null se nenhum)
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
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [boardId]);

    if (loading) return <div>Carregando…</div>;
    if (!board) return <div>Board não encontrado</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Board: {board.titulo}</h1>

            <div className="flex gap-4">
                {listas.map((lista) => (
                    <div key={lista.id} className="p-4 rounded-[8px] shadow w-[15rem] border-2 border-black">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-3">{lista.titulo}</h2>
                            <FaPencil className="cursor-pointer" />
                        </div>

                        {(lista.tasks ?? []).length ? (
                            <ul className="space-y-2">
                                {(lista.tasks ?? []).map((t) => (
                                    <li key={t.id} className="rounded-[8px] border p-2">
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
                                                <div className="flex items-center justify-between px-6 py-3 border-b">
                                                    <h1 className="text-2xl font-black leading-snug mb-2">
                                                        {t.titulo}
                                                    </h1>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-[1fr_26rem] gap-6 p-6">
                                                    <div className="bg-white">
                                                        <div className="rounded-2xl border bg-gray-50 p-5">
                                                            <div className="flex items-center gap-2 mb-2">
                                                                <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
                                                                    <path d="M4 4h16v16H4z" fill="none" stroke="currentColor" strokeWidth="2" />
                                                                    <path d="M7 9h10M7 13h10M7 17h6" stroke="currentColor" strokeWidth="2" />
                                                                </svg>
                                                                <h3 className="font-semibold">Descrição</h3>
                                                            </div>
                                                            <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                                                {t?.descricao?.trim() ? t.descricao : "Sem descrição"}
                                                            </p>
                                                            {(t as any)?.prazo && (
                                                                <div className="mt-4 flex items-center gap-2 text-sm">
                                                                    <span className="opacity-70">Prazo:</span>
                                                                    <span className="font-medium">
                                                                        {new Date((t as any).prazo).toLocaleDateString("pt-BR", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                            year: "numeric",
                                                                        })}
                                                                    </span>
                                                                </div>
                                                            )}

                                                            <div className="mt-4">
                                                                <button className="rounded-lg border px-3 py-1.5 text-sm hover:bg-white">
                                                                    Editar
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Coluna direita: comentários */}
                                                    <aside className="rounded-2xl border bg-gray-50 p-5 h-fit">
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h2 className="font-semibold">Comentários e atividade</h2>
                                                            <button className="text-sm rounded-md border px-2 py-1 hover:bg-white">
                                                                Ocultar detalhes
                                                            </button>
                                                        </div>

                                                        {/* Caixa de novo comentário */}
                                                        <div className="flex items-start gap-3 mb-4">
                                                            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white grid place-items-center text-sm font-bold">
                                                                {/** avatar fake (iniciais) */}
                                                                {("LF").slice(0, 2)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <input
                                                                    type="text"
                                                                    placeholder="Escrever um comentário…"
                                                                    className="w-full rounded-md border px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-indigo-500"
                                                                />
                                                                <div className="flex justify-end mt-2">
                                                                    <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-white">
                                                                        Enviar
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        {/* Linha do tempo de atividade (mock) */}
                                                        <div className="space-y-4">
                                                            <div className="flex gap-3">
                                                                <div className="h-8 w-8 rounded-full bg-gray-300 grid place-items-center text-xs">LF</div>
                                                                <div className="text-sm">
                                                                    <div className="font-medium">Lucas Fernandes</div>
                                                                    <div className="opacity-75">adicionou este cartão a Backlog</div>
                                                                    <a className="text-xs text-indigo-600 hover:underline" href="#">
                                                                        2 de set. de 2025, 18:18
                                                                    </a>
                                                                </div>
                                                            </div>
                                                            {/* Adicione outras entradas de atividade aqui */}
                                                        </div>
                                                    </aside>
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

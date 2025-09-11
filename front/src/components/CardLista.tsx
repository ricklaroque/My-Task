import { FaRegCalendarCheck } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";
import type { ListaType } from "../utils/ListaType";
import { Modal } from "./Modal";
import type { ComentarioType } from "../utils/ComentarioType";
import { useUsuarioStore } from "../context/UsuarioContext";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
    conteudo: string
}

export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<BoardType | null>(null);
    const [listas, setListas] = useState<ListaType[]>([]);
    const { usuario } = useUsuarioStore()
    const [comentarios, setComentarios] = useState<ComentarioType[]>([]);
    const [loading, setLoading] = useState(true);
    const { register, handleSubmit, reset } = useForm<Inputs>();
    const [openTaskId, setOpenTaskId] = useState<number | null>(null);

    useEffect(() => {
        if (!boardId) return;
        (async () => {
            try {
                setLoading(true);
                const response = await fetch(`${apiUrl}/boards/${boardId}/listas/tasks/comentarios`);
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

    useEffect(() => {
        if (openTaskId == null) {
            setComentarios([]);
            return;
        }
        (async () => {
            try { 
                let taskAberta = null;
                for (const lista of listas) {
                    taskAberta = lista.tasks?.find(t => t.id === openTaskId);
                    if (taskAberta) break;
                }
                if (taskAberta && taskAberta.comentarios) {
                    setComentarios(taskAberta.comentarios);
                } else {
                    setComentarios([]);
                }
            } catch (err) {
                console.error("Erro ao carregar comentários:", err);
                setComentarios([]);
            }
        })();
    }, [openTaskId, listas]);

    if (loading) return <div>Carregando…</div>;
    if (!board) return <div>Board não encontrado</div>;


    async function enviarComentario(data: Inputs) {
        if (!openTaskId) return;
        const response = await fetch(`${apiUrl}/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                conteudo: data.conteudo,
                usuarioId: usuario.id,
                taskId: openTaskId
            }),
        })
        if (response.status == 201) {
            toast.success("Comentário adicionado!")
            const novoComentario = await response.json();
            setComentarios(prev => [...prev, novoComentario]);
            reset();
        } else {
            toast.error("Erro ao adicionar comentário.")
        }
    }

    return (
        <div className="p-6 w-[80vw] h-[85vh] m-auto bg-white rounded-sm">
            <h1 className="text-2xl font-bold mb-6 text-[#3B82F6] border-[#3B82F6] border-b-2">{board.titulo}</h1>
            <div className="flex gap-4">
                {listas.map((lista) => (
                    <div key={lista.id} className="text-[#3B82F6] bg-[#FFFFFF] p-4 rounded-[8px] shadow-xl w-[15rem] hover:shadow-2xl">
                        <div className="flex justify-between">
                            <h2 className="text-lg font-bold mb-3">{lista.titulo}</h2>
                            <FaPencil className="cursor-pointer hover:text-blue-300" />
                        </div>
                        {(lista.tasks ?? []).length ? (
                            <ul className="space-y-2">
                                {(lista.tasks ?? []).map((t) => (
                                    <li key={t.id} className="text-[#3B82F6] rounded-[8px] border p-2 hover:bg-blue-300 hover:text-white cursor-pointer">
                                        <div className="flex items-center">
                                            <input type="checkbox" className="cursor-pointer ml-[0.4rem]" />
                                            <button
                                                onClick={() => setOpenTaskId(t.id)}
                                                className="font-medium ml-[1rem] w-[8.5rem] cursor-pointer text-start">
                                                {t.titulo}
                                            </button>
                                        </div>
                                        <Modal
                                            isOpen={openTaskId === t.id}
                                            onClose={() => setOpenTaskId(null)}>
                                            <div className="max-w-[90vw]  h-[27rem] mr-[2rem]">
                                                <h1 className="text-2xl font-black leading-snug mb-2 w-[54.9vw] pl-[1rem] text-[#3B82F6]">{lista.titulo}</h1>
                                                <div className="flex items-center justify-between py-3 ">
                                                    <h1 className="text-l font-bold pl-[1rem] text-[#3B82F6]">
                                                        {t.titulo}
                                                    </h1>
                                                </div>
                                                <div className="flex gap-6 pl-[1rem] ">
                                                    <div className="rounded-2xl p-5 w-[27rem] h-[20rem] shadow-md shadow-blue-400">
                                                        <div className="flex items-center gap-2 mb-2">
                                                            <FaRegCalendarCheck className="text-[#3B82F6]" />
                                                            <h3 className="font-semibold text-[#3B82F6]">Descrição</h3>
                                                            <div className="ml-[14rem] text-[#3B82F6] cursor-pointer">
                                                                <button className="rounded-md border px-3 py-1.5 text-sm hover:bg-white">
                                                                    Editar
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <p className="text-sm leading-relaxed whitespace-pre-wrap text-[#3B82F6]">
                                                            {t?.descricao?.trim() ? t.descricao : "Sem descrição"}
                                                        </p>
                                                        {(t as any)?.prazo && (
                                                            <div className="mt-4 flex items-center gap-2 text-sm text-[#3B82F6]">
                                                                <span className="font-bold ">Prazo para:</span>
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
                                                    <form className="rounded-2xl p-5 w-[28rem] h-[20rem] ml-[1rem] shadow-md shadow-blue-400 text-[#3B82F6]" onSubmit={handleSubmit(enviarComentario)}>
                                                        <div className="flex items-center justify-between mb-3">
                                                            <h2 className="font-semibold">Comentários e atividade</h2>
                                                            <button type="submit" className="rounded-md border px-3 py-1.5 text-sm hover:bg-white">
                                                                Enviar
                                                            </button>
                                                        </div>
                                                        <div className="flex items-start gap-3 mb-4">
                                                            <div className="h-8 w-8 rounded-full bg-white-600 text-[#3B82F6] grid place-items-center text-sm font-bold">
                                                                {("LF").slice(0, 2)}
                                                            </div>
                                                            <div className="flex-1">
                                                                <input {...register("conteudo", { required: true })}
                                                                    type="text"
                                                                    placeholder="Escreva um comentário…"
                                                                    className="w-full rounded-md border px-3 py-2 text-sm bg-white outline-none focus:ring-2 focus:ring-blue-600"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="w-[25.5rem] h-[9rem] bg-gray-200 rounded-xl p-2 overflow-y-auto">
                                                            {(comentarios ?? []).length > 0 ? (
                                                                comentarios.map((c) => (
                                                                    <div key={c.id} className="border-b border-gray-300 py-2 mb-2">
                                                                        <p className="text-sm text-black">{c.conteudo}</p>
                                                                    </div>
                                                                ))
                                                            ) : (
                                                                <p className="text-sm text-gray-500">Sem comentários ainda.</p>
                                                            )}
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

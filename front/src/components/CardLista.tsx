
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";
import type { ListaType } from "../utils/ListaType";

const apiUrl = import.meta.env.VITE_API_URL

export default function CardLista() {
    const { boardId } = useParams<{ boardId: string }>();
    const [board, setBoard] = useState<BoardType | null>(null);
    const [listas, setListas] = useState<ListaType[]>([]);
    const [loading, setLoading] = useState(true);

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
                    <div key={lista.id} className="p-4 rounded-lg shadow w-[15rem] border-2 border-black">
                        <h2 className="text-lg font-semibold mb-3">{lista.titulo}</h2>

                        {(lista.tasks ?? []).length ? (
                            <ul className="space-y-2">
                                {(lista.tasks ?? []).map((t) => (
                                    <li key={t.id} className="rounded border p-2">
                                        <div className="flex items-center justify-between">
                                            <strong className="line-clamp-1">{t.titulo}</strong>
                                            {/* <span>{t.feito ? "✅" : "⬜"}</span> */}
                                        </div>
                                        {t.descricao && <p className="text-sm text-gray-600 mt-1">{t.descricao}</p>}
                                        {t.prazo && <p className="text-xs text-gray-500 mt-1">{new Date(t.prazo).toLocaleDateString("pt-BR")}</p>}
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
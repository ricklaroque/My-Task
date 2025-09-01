// AddBoard.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import type { BoardType } from "../utils/BoardType";
import { useBoardStore } from "../context/BoardContext";

const apiUrl = import.meta.env.VITE_API_URL;

type BoardForm = {
  titulo: string;
  motivo: "TRABALHO" | "ESTUDO" | "PESSOAL" | "OUTRO";
  usuarioId: string;
};

export function AddBoard({ usuarioId, onCreated }: {
  usuarioId: string;
  onCreated?: (board: BoardType) => void;
}) {
  const adicionarBoardNaStore = useBoardStore(s => s.adicionarBoard);

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } =
    useForm<BoardForm>({
      defaultValues: { titulo: "", motivo: "OUTRO", usuarioId }
    });

  const onSubmit: SubmitHandler<BoardForm> = async (data) => {
    const resp = await fetch(`${apiUrl}/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // se usa cookie/sessão no backend, descomente:
      // credentials: "include",
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      console.error("Falha ao criar board:", await resp.text());
      return;
    }

    const criado: BoardType = await resp.json();
    adicionarBoardNaStore(criado);
    reset({ titulo: "", motivo: "OUTRO", usuarioId });
    onCreated?.(criado);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Título</label>
        <input
          type="text"
          {...register("titulo", {
            required: "Informe um título",
            minLength: { value: 3, message: "Mínimo de 3 caracteres" },
          })}
          className="w-full rounded-lg border px-3 py-2"
          placeholder="Ex.: Projeto X"
        />
        {errors.titulo && <p className="text-red-600 text-xs mt-1">{errors.titulo.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Motivo</label>
        <select
          {...register("motivo", { required: "Selecione um motivo" })}
          className="w-full rounded-lg border px-3 py-2"
        >
          <option value="TRABALHO">TRABALHO</option>
          <option value="ESTUDO">ESTUDO</option>
          <option value="PESSOAL">PESSOAL</option>
          <option value="OUTRO">OUTRO</option>
        </select>
        {errors.motivo && <p className="text-red-600 text-xs mt-1">{errors.motivo.message}</p>}
      </div>

      <input type="hidden" {...register("usuarioId")} />

      <button type="submit" disabled={isSubmitting}
        className="rounded-lg bg-blue-600 text-white px-4 py-2 disabled:opacity-60">
        {isSubmitting ? "Salvando..." : "Adicionar Board"}
      </button>
    </form>
  );
}

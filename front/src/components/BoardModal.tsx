// CardBoardModal.tsx
import { useForm, type SubmitHandler } from "react-hook-form";
import type { BoardType } from "../utils/BoardType";
import { useBoardStore } from "../context/BoardContext";

const apiUrl = import.meta.env.VITE_API_URL;

// Tipo apenas do payload de criação (sem id/createdAt que o backend costuma preencher)
type BoardInput = {
  titulo: string;
  motivo: string;
  usuarioId: string;
};

export function NovoBoard({ usuarioId }: { usuarioId: string }) {
  const adicionarBoard = useBoardStore((s) => s.adicionarBoard);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BoardInput>({
    defaultValues: {
      titulo: "",
      motivo: "",
      usuarioId,
    },
  });

  const onSubmit: SubmitHandler<BoardInput> = async (data) => {
    try {
      const resp = await fetch(`${apiUrl}/boards`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        console.error("Falha ao criar Board:", txt);
        return;
      }
      const novoBoard: BoardType = await resp.json();
      adicionarBoard(novoBoard);
      reset({ titulo: "", motivo: "", usuarioId });
    } catch (e) {
      console.error("Erro inesperado ao criar Board:", e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 w-[20vw] mx-auto h-[40vh] my-auto px-[2rem] py-[1rem] rounded-lg"
    >
      <h1 className="font-bold text-center text-2xl">Criar novo Board</h1>

      <div>
        <label className="block text-sm">Título</label>
        <input
          className="border rounded px-2 py-1 w-full"
          {...register("titulo", { required: "Informe o título" })}
        />
        {errors.titulo && (
          <p className="text-red-600 text-xs">{errors.titulo.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm">Motivo</label>
        <textarea
          className="border rounded px-2 py-1 w-full"
          {...register("motivo", { required: "Informe o motivo" })}
        />
        {errors.motivo && (
          <p className="text-red-600 text-xs">{errors.motivo.message}</p>
        )}
      </div>
      <input type="hidden" {...register("usuarioId")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="text-gray-900 px-3 py-2 rounded hover:bg-gray-300 disabled:opacity-60"
      >
        {isSubmitting ? "Salvando..." : "Criar Board"}
      </button>
    </form>
  );
}

import { useForm, type SubmitHandler } from "react-hook-form";
import type { TaskType } from "../utils/TaskType";
const apiUrl = import.meta.env.VITE_API_URL;

export function NovaTask({ listaId, usuarioId }: { listaId: number; usuarioId: string }) {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<TaskType>({
        defaultValues: {
            titulo: "",
            descricao: "",
            prazo: "",
            listaId,
            usuarioId,
        },
    });

    const onSubmit: SubmitHandler<TaskType> = async (data) => {
        const isoPrazo = new Date(data.prazo + "T00:00:00");
        const payload = {
            ...data,
            prazo: isoPrazo.toISOString(),
        };
        const resp = await fetch(`${apiUrl}/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) {
            const txt = await resp.text();
            console.error("Falha ao criar task:", txt);
            return;
        }
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 w-[20vw] mx-auto h-[40vh] my-auto px-[2rem] py-[1rem] rounded-lg">
            <h1 className="font-bold text-center text-2xl">Adicione uma Task</h1>
            <div>
                <label className="block text-sm">Título</label>
                <input
                    className="border rounded px-2 py-1 w-full"
                    {...register("titulo", { required: "Informe o título" })}
                />
                {errors.titulo && <p className="text-red-600 text-xs">{errors.titulo.message}</p>}
            </div>

            <div>
                <label className="block text-sm">Descrição</label>
                <textarea className="border rounded px-2 py-1 w-full " {...register("descricao")} />
            </div>

            <div>
                <label className="block text-sm">Prazo</label>
                <input
                    type="date"
                    className="border rounded px-2 py-1"
                    {...register("prazo", { required: "Informe o prazo" })}
                />
                {errors.prazo && <p className="text-red-600 text-xs">{errors.prazo.message}</p>}
            </div>

            <input type="hidden" {...register("listaId", { valueAsNumber: true })} />
            <input type="hidden" {...register("usuarioId")} />

            <button
                type="submit"
                disabled={isSubmitting}
                className=" text-gray-900 px-3 py-2 rounded hover:bg-gray-300"
            >
                {isSubmitting ? "Salvando..." : "Adicionar Task"}
            </button>
        </form>
    )
}

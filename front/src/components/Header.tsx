import { useForm } from "react-hook-form";
import { toast } from "sonner";
import logoDefinitiva from "../img/logoDefinitiva.png"
import type { BoardType } from "../utils/BoardType";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  termo: string;
};

type HeaderProps = {
  setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
};

export default function Header({ setBoards }: HeaderProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();

  async function enviaPesquisa(data: Inputs) {
    if (data.termo.length < 1) {
      toast.error("Informe, no mínimo, 1 caractere");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/boards/pesquisa/${data.termo}`);
      const dados = await response.json();
      setBoards(dados);
    } catch (error) {
      toast.error("Erro ao buscar boards");
    }
  }

  async function mostraDestaques() {
    try {
      const response = await fetch(`${apiUrl}/boards`);
      const dados = await response.json();
      reset({ termo: "" });
      setBoards(dados);
    } catch (error) {
      toast.error("Erro ao carregar boards");
    }
  }

  return (
    <header className="sticky top-0 z-40 h-[10rem] w-full border-b border-gray-200 bg-white/80 backdrop-blur dark:bg-gray-800 dark:border-gray-800">
      <div className="mx-auto py-3 flex items-center justify-between gap-4">

        {/* LOGO + TEXTO */}
        <div className="flex items-center gap-2 ml-[8rem]">
          <img src={logoDefinitiva} className="w-[7rem] h-[7rem] rounded-[5rem]" />
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            MyTask
          </span>
        </div>

        {/* PESQUISA */}
        <form onSubmit={handleSubmit(enviaPesquisa)} className="relative flex-1 max-w-xl">
          <input
            {...register("termo")}
            type="search"
            placeholder="Pesquisa"
            className="h-10 w-full rounded-full border border-gray-300 bg-white pl-10 pr-4 text-sm
               outline-none focus:ring-2 focus:ring-blue-400
               dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100"
          />

          {/* Lupa centralizada e discreta */}
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 18.5a7.5 7.5 0 006.15-3.85z" />
          </svg>
        </form>


        <div className="flex items-center gap-3">
          <button
            onClick={mostraDestaques}
            className="px-4 py-2 rounded-full border border-gray-300 text-sm font-medium hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            Novo
          </button>

          <div className="h-8 mr-[8rem] w-8 rounded-full bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-200 font-bold">
            R
          </div>
        </div>
      </div>
    </header>
  );
}

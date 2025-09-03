import { useForm } from "react-hook-form";
import { toast } from "sonner";
import logoDefinitiva from "../img/logoDefinitiva.png"
import type { BoardType } from "../utils/BoardType";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../context/UsuarioContext";

const apiUrl = import.meta.env.VITE_API_URL;

type Inputs = {
  termo: string;
};

type HeaderProps = {
  setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
};

export default function Header({ setBoards }: HeaderProps) {
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const { usuario, deslogaUsuario } = useUsuarioStore()
  const navigate = useNavigate()

  function usuarioSair() {
    if (confirm("Confirmar saída do sistema? ")) {
      deslogaUsuario()
      if(localStorage.getItem("usuarioKey")) {
        localStorage.removeItem("usuarioKey")
      }
      navigate("/login")
    }
  }

  
  


  return (
    <header className="w-full bg-slate-800/40 border-b dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-3">
          <img src={logoDefinitiva} className="w-12 h-12 rounded-full" />
          <span className="text-xl font-semibold text-white">
            MyTask
          </span>
        </div>
        <form className="relative flex-1 max-w-md mx-8">
          <input
            {...register("termo")}
            type="search"
            placeholder="Pesquisa"
            className="h-10 w-full rounded-lg border border-slate-600 bg-slate-700 pl-10 pr-4 text-sm text-white placeholder-slate-400
               outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </form>
        <Link to="/login" className="text-white font-bold cursor-pointer">
        Login
        </Link>
      </div>
    </header>
  );
}

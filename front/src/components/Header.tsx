import { useForm } from "react-hook-form";
import { toast } from "sonner";
import logo from "../img/MyT.png"
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
      if (localStorage.getItem("usuarioKey")) {
        localStorage.removeItem("usuarioKey")
      }
      navigate("/login")
    }
  }

  return (
    <header className="w-full bg-white dark:bg-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} className="w-25 h-20 rounded-full" />
        </div>
        <form className="relative flex-1 max-w-md mx-8 flex items-center focus:border-none">
          <input
            {...register("termo")}
            type="search"
            placeholder="Pesquisa"
            className="h-10 w-full rounded-lg border-2 border-black pl-10 pr-4 text-sm text-black placeholder-black
               outline-none focus:ring-gray-500 focus:ring-2 focus:border-none transition-colors duration-300 hover:border-gray-500"
          />
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <h1
            className="ml-4 text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg 
               transition-colors duration-300 
               hover:bg-gray-300 hover:text-white"
          >
            Criar
          </h1>
        </form>
        <div className="flex items-center gap-4">
          <Link
            to="/boards"
            className="text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
                       transition-colors duration-300
                       hover:bg-gray-300 hover:text-white"
          >
            Boards
          </Link>
          <Link
            to="/login"
            className="text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
                       transition-colors duration-300
                       hover:bg-gray-300 hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}
import logo from "../img/MyT.png";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../context/UsuarioContext";

export default function Header() {

  const { usuario, deslogaUsuario } = useUsuarioStore();
  const navigate = useNavigate();

  function usuarioSair() {
    if (confirm("Confirmar saída do sistema? ")) {
      deslogaUsuario();
      if (localStorage.getItem("usuarioKey")) {
        localStorage.removeItem("usuarioKey");
      }
      navigate("/login");
    }
  }


  return (
    <header className="bg-cyan-600 dark:bg-gray-700">
      <div className="mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} className="w-25 h-20 rounded-full" />
        </div>

        <form className="relative flex-1 max-w-md mx-8 flex items-center focus:border-none">
          <ul className="flex">
            <input

              type="search"
              placeholder="Pesquisa"
              className="h-10 w-[35rem] rounded-[5px] border-2 border-black pl-10 pr-10 text-sm text-black placeholder-black
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

            <button
              type="button"
              className="ml-4 text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg 
              transition-colors duration-300 hover:bg-gray-300 hover:text-white"
            >
              Criar
            </button>
          </ul>
        </form>

        <div className="flex items-center">
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
                       hover:bg-gray-300 hover:text-white"
          >
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

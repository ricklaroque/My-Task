// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";
import logo from "../img/logoMyT.png"

import { Link, useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../context/UsuarioContext";


export default function Header() {
  const { usuario, deslogaUsuario } = useUsuarioStore()
  const navigate = useNavigate()

  function primeiroNome(nomeCompleto: string) {
    return nomeCompleto.split(" ")[0];
  }

  function usuarioSair() {
    if (confirm("Confirma saída do sistema?")) {
      deslogaUsuario()
      if (localStorage.getItem("usuarioKey")) {
        localStorage.removeItem("usuarioKey")
      }
      navigate("/login")
    }
  }

  return (
    <header className="bg-[#111827] dark:bg-gray-700">
      <div className="w-[80%] mx-auto px-6 flex items-center justify-between">

        <div className="flex items-center">
          <img src={logo} className="w-25 h-20 rounded-full" />
        </div>

        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-[#E5E7EB] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg 
            transition-colors duration-300 hover:bg-gray-300 hover:text-white"
            >
              Criar
            </button>

            <div className="relative">
              <IoSearchSharp className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2 h-4 text-gray-500" />
              <input
                type="search"
                placeholder="Pesquisa"
                className="h-10 w-[30rem] rounded-[5px] border-2 border-[#E5E7EB] pl-8 pr-10 text-sm text-[#E5E7EB] placeholder-[#E5E7EB]
              outline-none focus:ring-gray-500 focus:ring-2 focus:border-none transition-colors duration-300 hover:border-gray-500"
              />
            </div>

            <Link
              to="/boards"
              className="text-[#E5E7EB] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
            transition-colors duration-300 hover:bg-gray-300 hover:text-white"
            >
              Boards
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          {usuario.id ? (
            <>
              <span className="text-[#E5E7EB] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
            transition-colors duration-300 hover:bg-gray-300 hover:text-white mr-4">
                Olá {primeiroNome(usuario.nome)}
              </span>
              <button
                onClick={usuarioSair}
                className="text-[#E5E7EB] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
              transition-colors duration-300 hover:bg-gray-300 hover:text-white"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-[#E5E7EB] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
            transition-colors duration-300 hover:bg-gray-300 hover:text-white"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>

  );

}
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import { IoSearchSharp } from "react-icons/io5";
import { FaRegCalendarCheck } from "react-icons/fa";
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
    <header className="bg-[#F5F7FA] dark:bg-gray-700 py-4">
      <div className="w-[80%] mx-auto px-6 flex items-center justify-between">

        <div className="flex items-center gap-2 ">
          {/* <img src={logo} className="w-25 h-20 rounded-full" /> */}
          <FaRegCalendarCheck size={24} className="text-[#3B82F6]" />
          <h1 className="text-[#3B82F6] text-[1.5rem] font-bold">MyT</h1>
        </div>

        <div className="flex flex-1 justify-center">
          <div className="flex items-center gap-4">
            <button
              type="button"
              className="text-[#3B82F6] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg 
            transition-colors duration-500 hover:bg-[#155fd6] hover:text-white hover:shadow-md "
            >
              Criar
            </button>

            <div className="relative">
              <IoSearchSharp className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-2 h-4 text-[#3B82F6]" />
              <input
                type="search"
                placeholder="Pesquisa"
                className="h-10 w-[30rem] rounded-[5px] border-2 border-[#3B82F6] pl-8 pr-10 text-sm text-[#3B82F6] placeholder-[#3B82F6]
              outline-none focus:ring-[#3B82F6] focus:ring-2 focus:border-none transition-all duration-500 hover:border-[#155fd6] hover:shadow-md "
              />
            </div>

            <Link
              to="/boards"
              className="text-[#3B82F6] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
            transition-colors duration-500 hover:bg-[#155fd6] hover:text-white hover:shadow-md"
            >
              Boards
            </Link>
          </div>
        </div>

        <div className="flex items-center">
          {usuario.id ? (
            <>
              <span className="text-[#3B82F6] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
            transition-colors duration-500 hover:bg-[#155fd6] hover:text-white mr-4">
                Olá, {primeiroNome(usuario.nome)}!
              </span>
              <button
                onClick={usuarioSair}
                className="text-[#3B82F6] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
              transition-colors duration-500 hover:bg-[#155fd6] hover:text-white"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="text-[#3B82F6] font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
            transition-colors duration-500 hover:bg-[#155fd6] hover:text-white hover:shadow-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </header>

  );

}
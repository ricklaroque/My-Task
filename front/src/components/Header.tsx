// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
import logo from "../img/MyT.png"
// import type { BoardType } from "../utils/BoardType";
import { Link, useNavigate } from "react-router-dom";
import { useUsuarioStore } from "../context/UsuarioContext";
// import { useState } from "react";
// import Modal from "../utils/Modal";
// import { NovaTask } from "./CardTaskModal";

// const apiUrl = import.meta.env.VITE_API_URL;

// type Inputs = {
//   termo: string;
// };

// type HeaderProps = {
//   setBoards: React.Dispatch<React.SetStateAction<BoardType[]>>;
// };
// { setBoards }: HeaderProps
// async function criarBoard() {
//   const { adicionarBoard } = useBoardStore.getState()
//   const resp = await fetch("/api/boards", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ titulo: "Novo Board", motivo: "Teste" })
//   });
//   const novoBoard = await resp.json()
//   adicionarBoard(novoBoard)

// }

export default function Header() {
  const { usuario, deslogaUsuario } = useUsuarioStore()
  const navigate = useNavigate()

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
    <header className="bg-cyan-600 dark:bg-gray-700">
      <div className=" mx-auto px-6 flex items-center justify-between">
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
                transition-colors duration-300  hover:bg-gray-300 hover:text-white"
            >
              Criar
            </button>
          </ul>
        </form>
        <div className="flex items-center">
          <ul>
            <li>
              {usuario?.id ?
                <>
                  <span className="text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
                       transition-colors duration-300
                       hover:bg-gray-300 hover:text-white">
                    {usuario?.nome}
                  </span>
                  &nbsp;&nbsp;
                  <Link
                    to="/boards"
                    className="text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
                           transition-colors duration-300
                           hover:bg-gray-300 hover:text-white"
                  >
                    Boards
                  </Link>
                  <button
                    onClick={usuarioSair}
                    className="text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
                           transition-colors duration-300
                           hover:bg-gray-300 hover:text-white"
                  >
                    Sair
                  </button>
                </>
                :
                <Link
                  to="/login"
                  className="text-black font-bold text-[1rem] cursor-pointer px-4 py-2 rounded-lg
                         transition-colors duration-300
                         hover:bg-gray-300 hover:text-white"
                >
                  Login
                </Link>
              }
            </li>
          </ul>
        </div>
      </div>
    </header>
  );

}
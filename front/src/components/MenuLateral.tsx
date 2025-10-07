import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaCarSide, FaUsers } from "react-icons/fa6"
import { BsCashCoin } from "react-icons/bs"
import { FaRegUser } from "react-icons/fa"

import { Link, useNavigate } from "react-router-dom"

export function MenuLateral() {
  const navigate = useNavigate()
//   const { admin, deslogaAdmin } = useAdminStore()

//   function adminSair() {
//     if (confirm("Confirma Saída?")) {
//       deslogaAdmin()
//       navigate("/", { replace: true })
//     }
//   }

  return (
    <aside id="default-sidebar" className="fixed mt-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          <li>
            <Link to="/admin" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <BiSolidDashboard />
              </span>
              <span className="ms-2 mt-1">Visão Geral</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/carros" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <FaCarSide />
              </span>
              <span className="ms-2 mt-1">Cadastro de Veículos</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/clientes" className="flex items-center p-2">
              <span className="h-5 text-gray-600 text-2xl">
                <FaUsers />
              </span>
              <span className="ms-2 mt-1">Controle de Clientes</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/propostas" className="flex items-center p-2 cursor-pointer">
              <span className="h-5 text-gray-600 text-2xl">
                <BsCashCoin />
              </span>
              <span className="ms-2 mt-1">Controle de Propostas</span>
            </Link>
          </li>
         
        </ul>
      </div>
    </aside>
  )
}
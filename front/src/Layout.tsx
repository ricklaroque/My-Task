// Layout.tsx
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useUsuarioStore } from "./context/UsuarioContext";

const apiUrl = import.meta.env.VITE_API_URL;

export default function Layout() {
  const { logaUsuario, deslogaUsuario } = useUsuarioStore();

  useEffect(() => {
    async function buscaUsuario(id: string) {
      const response = await fetch(`${apiUrl}/usuarios/${id}`);
      if (!response.ok) {
        deslogaUsuario();
        return;
      }
      const dados = await response.json();
      logaUsuario(dados);
    }

    if (localStorage.getItem("usuarioKey")) {
      const idUsuario = localStorage.getItem("usuarioKey") as string;
      buscaUsuario(idUsuario); 
    } else {
      deslogaUsuario();
    }
  }, []);

  return (
    <div className="bg-[#F5F7FA] min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

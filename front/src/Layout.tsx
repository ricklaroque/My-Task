import Header from "./components/Header";
// Layout.tsx
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";
// import { useState } from "react";
// import type { BoardType } from "./utils/BoardType";

export default function Layout() {
  // const [boards, setBoards] = useState<BoardType[]>([]);
  // const location = useLocation()
  // const routesSemHeader = ['/login', '/cadastro']

  return (
    <>
      {/* <Header setBoards={setBoards} /> */}
      {/* {!routesSemHeader.includes(location.pathname) && <Header setBoards={setBoards} />} */}
      <Header/>
      <Outlet />
      <Toaster richColors position="top-center"/>
      {/* context={{ boards, setBoards }}  */}
    </>
  );
}

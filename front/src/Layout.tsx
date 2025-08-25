// Layout.tsx
import { Outlet, useLocation } from "react-router-dom";
import { useState, type SetStateAction } from "react";
import Header from "./components/Header";
import type { BoardType } from "./utils/BoardType";

export default function Layout() {
  const [boards, setBoards] = useState<BoardType[]>([]);
  const location = useLocation()
  const routesSemHeader = ['/login', '/cadastro']

  return (
    <>
      {/* <Header setBoards={setBoards} /> */}
      {!routesSemHeader.includes(location.pathname) && <Header setBoards={function (value: SetStateAction<BoardType[]>): void {
        throw new Error("Function not implemented.");
      } } />}
      <Outlet />
      <Outlet context={{ boards, setBoards }} />
    </>
  );
}

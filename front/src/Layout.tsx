// Layout.tsx
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Header from "./components/Header";
import type { BoardType } from "./utils/BoardType";

export default function Layout() {
  const [boards, setBoards] = useState<BoardType[]>([]);

  return (
    <>
      <Header setBoards={setBoards} />
      <Outlet context={{ boards, setBoards }} />
    </>
  );
}

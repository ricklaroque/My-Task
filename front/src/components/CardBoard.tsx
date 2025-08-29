import { Link } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Modal from "react-responsive-modal";

function corFundo(motivo: BoardType["motivo"]) {
  switch (motivo) {
    case "TRABALHO": return "bg-blue-300";
    case "ESTUDO": return "bg-emerald-100";
    case "PESSOAL": return "bg-green-300";
    case "OUTRO": return "bg-red-300";
    default: return "bg-gray-100";
  }
}
function corFonte(motivo: BoardType["motivo"]) {
  switch (motivo) {
    case "TRABALHO": return "text-red-700";
    case "ESTUDO": return "text-emerald-700";
    case "PESSOAL": return "text-pink-700";
    case "OUTRO": return "text-red-700";
    default: return "text-gray-700";
  }
}

export function CardBoard({ data }: { data: BoardType }) {
  return (

    <div className="group max-w-sm w-full h-[10rem] rounded-2xl shadow-sm hover:shadow-md transition-all bg-slate-300 border-l-black">
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h5 className="text-xl font-semibold tracking-tight line-clamp-1">
            {data.titulo}
          </h5>

          {data.motivo && (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${corFundo(data.motivo)} ${corFonte(data.motivo)}`}>
              {data.motivo}
            </span>
          )}
        </div>

        <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-blue-600 transition-all"
            style={{ width: `${Math.max(0, Math.min(100, data.progresso ?? 0))}%` }}
          />
        </div>

        {data.updatedAt && (
          <p className="mt-3 text-xs text-gray-400">
            Atualizado em {new Date(data.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        )}

        <Link
          to={`/listas/${data.id}`}
          className="mt-4 inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Abrir board
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div >
  );
}

import { Link } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";

function badgeColor(motivo: BoardType["motivo"]) {
  switch (motivo) {
    case "TRABALHO": return "bg-blue-100 text-blue-700";
    case "ESTUDO":   return "bg-emerald-100 text-emerald-700";
    case "PESSOAL":  return "bg-purple-100 text-purple-700";
    default:         return "bg-gray-100 text-gray-700";
  }
}

export function CardBoard({ data }: { data: BoardType }) {
  const listasCount = data.listas?.length ?? 0;
  const progresso =
    typeof data.progresso === "number"
      ? Math.max(0, Math.min(100, data.progresso))
      : undefined;

  return (
    <div className="group max-w-sm w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">
            {data.titulo}
          </h5>

          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColor(data.motivo)}`}>
            {data.motivo}
          </span>
        </div>

        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {listasCount} {listasCount === 1 ? "lista" : "listas"}
          {typeof progresso === "number" && (
            <> • {progresso}%</>
          )}
        </p>

        {/* barra de progresso opcional */}
        {typeof progresso === "number" && (
          <div className="mt-3 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${progresso}%` }}
            />
          </div>
        )}

        {data.updatedAt && (
          <p className="mt-3 text-xs text-gray-400">
            Atualizado em {new Date(data.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        )}

        <Link
          to={`/boards/${data.id}`}
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
    </div>
  );
}

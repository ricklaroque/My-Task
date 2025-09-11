import { Link } from "react-router-dom";
import type { BoardType } from "../utils/BoardType";

export function CardBoard({data}: {data:BoardType}) {
  if(!data) return null;
  return (
    // #3B82F6
    // #3faafb
    // #D2B48C
    <div className={`group w-full h-[10rem] bg-[#FFFFFF] rounded-lg  hover:shadow-gray-400 shadow-md`}>
      <div className="p-4">
        <div className="flex items-center  gap-3 col">
          <h5 className={`text-[#3B82F6] text-xl font-bold tracking-tight line-clamp-1  w-[10rem]`}>
            {data.titulo}
          </h5>

          {data.motivo && (
            <span className={`text-[#3B82F6] py-1 rounded-full text-xs font-bold ml-[5rem]`}>
              {data.motivo}
            </span>
          )}
        </div>

        <div className="mt-3 h-2 w-full rounded-full bg-[#3B82F6] dark:bg-gray-700">
          <div
            className="h-2 rounded-full bg-[#3B82F6] transition-all"
            style={{ width: `${Math.max(0, Math.min(100, data?.progresso ?? 0))}%` }}
          />
        </div>

        {data?.updatedAt && (
          <p className="mt-3 text-xs text-gray-400">
            Atualizado em {new Date(data.updatedAt).toLocaleDateString("pt-BR")}
          </p>
        )}

        <Link
          to={`/boards/${data?.id}/listas/tasks/comentarios`}
          className={`text-[#3B82F6] mt-7 inline-flex items-center px-3 py-2 text-sm font-medium  white border-2 rounded-lg focus:ring-2 hover:bg-[#155fd6] hover:border-none hover:text-white duration-1000`}
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

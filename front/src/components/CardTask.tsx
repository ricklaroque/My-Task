// import { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import Modal from "../utils/Modal";
// import type { TaskType } from "../utils/TaskType";
// import { NovaTask } from "./CardTaskModal";
// import { usetaskStore } from "../context/TaskContext";
// const apiUrl = import.meta.env.VITE_API_URL


// export default function CardTask() {
//     const { listaId } = useParams<{ listaId: string}>()
//     const 
//     const [loading, setLoading] = useState(true)
//     const { task, adicionartask, carregartasks, taskSelecionado } = usetaskStore()

//     useEffect(() => {
//         async function buscaDados() {
//             if (!listaId) { setLoading(false); return };
//             try {
//                 const responseLista = await fetch(`${apiUrl}/listas/${listaId}`)
//                 const dadosLista = await responseLista.json()
//                 setLista
//             }
//         }
//     })
// }

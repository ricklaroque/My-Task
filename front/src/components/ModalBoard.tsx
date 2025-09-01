// import { useForm, type SubmitHandler } from "react-hook-form"


// type BoardForm = {
//     titulo: string,
//     motivo: string,
//     usuarioId: string
// }
// export function adicionarBoard({usuarioId} : {usuarioId: string}) {
//     const {register, handleSubmit, reset, formState: { errors, isSubmitting }, } = useForm<TaskForm>({
//         defaultValues: {
//             titulo: "",
//             motivo: "",
//             usuarioId
//         }
//     })

//     const onSubmit: SubmitHandler<BoardForm> = async (data)=> {
//         const resp = await fetch(`${apiUrl}`)
//     }

    


//     return(
//         <form onSubmit={handleSubmit}>

//         </form>
//     )
// }
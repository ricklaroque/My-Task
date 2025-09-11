import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
    termo: string
}

type InputPesquisaProps = {
    onPesquisa: (termo: string) => void
}

export function InputPesquisa({ onPesquisa }: InputPesquisaProps) {
    const { register, handleSubmit } = useForm<Inputs>()

    async function enviaPesquisa(data: Inputs) {
        // Se o campo estiver vazio, mostra todos os boards
        if (!data.termo || data.termo.trim().length === 0) {
            onPesquisa("")
            return
        }
        
        if (data.termo.length < 2) {
            toast.error("Informe, no mínimo, 2 caracteres")
            return
        }
        onPesquisa(data.termo)
    }

    return (
        <form onSubmit={handleSubmit(enviaPesquisa)}>
            <input 
                type="search" 
                placeholder="Pesquisar boards..."
                className="h-10 w-[30rem] rounded-[5px] border-2 border-[#3B82F6] pl-8 pr-10 text-sm text-[#3B82F6] placeholder-[#3B82F6] outline-none focus:ring-[#3B82F6] focus:ring-2 focus:border-none transition-all duration-500 hover:border-[#155fd6] hover:shadow-md"
                {...register('termo')} 
            />
        </form>
    )
}
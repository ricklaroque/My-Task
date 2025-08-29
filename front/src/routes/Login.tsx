import { useForm } from "react-hook-form";

import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { toast } from "sonner";
import { useUsuarioBoard } from "../context/UsuarioContext"

type Inputs = {
    email: string
    senha: string
    manter: boolean
}

const apiUrl = import.meta.env.VITE_API_URL

export default function Login() {
    const { register, handleSubmit } = useForm<Inputs>()
    const { logaUsuario } = useUsuarioBoard()

    const navigate = useNavigate()

    useEffect(() => {
        // garante que o script só roda depois do componente montar
        const script = document.createElement("script");
        script.src = "/finisher-header.es5.min.js";
        script.onload = () => {
            // @ts-ignore porque o TS não conhece FinisherHeader 
            new window.FinisherHeader({
                count: 35,
                size: { min: 5, max: 120, pulse: 0.1 },
                speed: { x: { min: 0, max: 0.1 }, y: { min: 0, max: 0.2 } },
                colors: {
                    background: "#fff",
                    particles: ["#3999db", "#87ddfe", "#416bb2"], //514df roxo 274360 azul
                },
                blending: "overlay",
                opacity: { center: 0, edge: 0.7 },
                skew: 0,
                shapes: ["c"],
            });
        };
        document.body.appendChild(script);
    }, []);

    async function verificaLogin(data: Inputs) {
        // alert(`${data.email} ${data.senha} ${data.manter}`)
        const response = await
            fetch(`${apiUrl}/usuarios/login`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify({ email: data.email, senha: data.senha })
            })

        // console.log(response)
        if (response.status == 200) {
            // toast.success("Ok!")            
            const dados = await response.json()

            // "coloca" os dados do cliente no contexto
            logaUsuario(dados)

            // se o cliente indicou que quer se manter conectado
            // salvamos os dados (id) dele em localStorage
            if (data.manter) {
                localStorage.setItem("clienteKey", dados.id)
            } else {
                // se indicou que não quer permanecer logado e tem
                // uma chave (anteriormente) salva, remove-a
                if (localStorage.getItem("clienteKey")) {
                    localStorage.removeItem("clienteKey")
                }
            }

            // carrega a página principal, após login do cliente
            navigate("/")
        } else {
            toast.error("Erro... Login ou senha incorretos")
        }
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            {/* background animado */}
            <div className="finisher-header absolute inset-0 w-full h-full" />

            <div className="relative w-full max-w-sm p-6 bg-blue-300/50 rounded-2xl shadow-lg py-14transition-colors z-10">
                <h1 className="text-2xl font-bold text-left mb-6">Entrar</h1>
                <form onSubmit={handleSubmit(verificaLogin)} className="space-y-4">
                    <input
                        type="email"
                        placeholder="E-mail"
                        id="email"
                        className="w-full p-2 border-b-2 border-blue-500 focus:outline-none"
                        required {...register("email")}
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        id="password"
                        className="w-full p-2 border-b-2 border-blue-500 focus:outline-none"
                        required {...register("senha")}
                    />

                    <div className="flex items-start">

                        <div className="flex items-center h-5">

                            <input type="checkbox" id="remember" aria-describedby="remember"
                                className="w-4 h-4 border focus:outline-none border-gray-300 rounded bg-gray-50 focus:ring-primary-300"
                                {...register("manter")} />
                        </div>

                        <div className="ml-3 text-sm">
                            <label htmlFor="remember" className="text-gray-500">Manter Conectado</label>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded transition-colors hover:bg-blue-700 tracking-widest my-7"
                    >
                        CONTINUE
                    </button>
                </form>
                <a
                    href=""
                    className="flex justify-center text-gray-500 mb-7 transition-all hover:text-lg"
                >
                    Não possue conta? Cadastre-se
                </a>
            </div>
        </div>
    );
}

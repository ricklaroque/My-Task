import { useState, useEffect } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log({ email, senha });
  }

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

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {/* background animado */}
      <div className="finisher-header absolute inset-0 w-full h-full" />

      <div className="relative w-full max-w-sm p-6 bg-white/30 rounded-2xl shadow-lg py-14 hover:bg-white transition-colors z-10">
        <h1 className="text-2xl font-bold text-left mb-6">Entrar</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border-b-2 border-blue-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border-b-2 border-blue-500 focus:outline-none"
          />
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

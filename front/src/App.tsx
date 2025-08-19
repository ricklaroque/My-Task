import { useEffect, useState } from "react";

export default function App() {
  const [jogos, setJogos] = useState<JogoType[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch("http://localhost:3000/jogos")
      const dados = await response.json()
      console.log(dados)
      setJogos(dados)
    }
    buscaDados()
  }, [])

  const listaJogos = jogos.map( jogo => (
    <CardJogo data={jogo} key={jogo.id} />
  ))

  return (
    <>
      <InputPesquisa />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Veículos <span className="underline underline-offset-3 decoration-8 decoration-blue-900 dark:decoration-blue-400">em destaque</span>
        </h1>
        <div className="flex gap-3">
          {listaJogos}
        </div>
      </div>
    </>
  );
}

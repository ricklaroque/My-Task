import express from 'express'
import cors from 'cors'

import routesJogos from './routes/jogos'
import routesDesenvolvedoras from './routes/desenvolvedoras'
import routesGeneros from './routes/generos'

const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

app.use("/jogos", routesJogos)
app.use("/desenvolvedoras", routesDesenvolvedoras)
app.use("/generos", routesGeneros)

app.get('/', (req, res) => {
  res.send('API: Locação de Jogos')
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
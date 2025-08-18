import express from 'express'

import loginRoutes from './routes/login'

const app = express();
const port = 3000;

app.use(express.json())
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
    res.send('Trabalho Ling. Emergentes');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`)
})
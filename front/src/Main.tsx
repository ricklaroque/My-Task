import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.tsx'
import Layout from './Layout.tsx'
import Login from './routes/Login.tsx'
import Cadastro from './routes/Cadastro.tsx'
import CardLista  from './components/CardLista.tsx'

import './index.css'

const rotas = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'cadastro', element: <Cadastro /> },
      { path: 'listas/:boardId', element: <CardLista /> }
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)
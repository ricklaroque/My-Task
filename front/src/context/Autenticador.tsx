import { useEffect } from 'react'
import { useUsuarioStore } from '../context/UsuarioContext'

interface AutenticadorProps {
    children: React.ReactNode
}

export function Autenticador({ children }: AutenticadorProps) {
    const verificarUsuarioSalvo = useUsuarioStore(state => state.verificarUsuarioSalvo)
    
    useEffect(() => {
        verificarUsuarioSalvo()
    }, [verificarUsuarioSalvo])
    
    return <>{children}</>
}
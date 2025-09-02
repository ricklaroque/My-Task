import { create } from "zustand";
import type { ListaType } from "../utils/ListaType";

type ListaStore = {
    listas: ListaType[]
    listaSelecionado: ListaType | null
    carregarlistas: (listasCarregados: ListaType[]) => void
    selecionarlista: (lista: ListaType) => void
    adicionarlista: (novolista: ListaType) => void
    atualizarlista: (listaAtualizado: ListaType) => void
    removerlista: (listaId: number) => void
    limparlistas: () => void
}

export const uselistaStore = create<ListaStore>((set) => ({
    listas: [],
    listaSelecionado: null,
    carregarlistas: (listasCarregados: ListaType[]) => set({ listas: listasCarregados }),
    selecionarlista: (lista: ListaType) => set({ listaSelecionado: lista }),
    adicionarlista: (novolista: ListaType) => set((state) => ({
        listas: [...state.listas, novolista]
    })),
    atualizarlista: (listaAtualizado: ListaType) => set((state) => ({
        listas: state.listas.map(lista => 
            lista.id === listaAtualizado.id ? listaAtualizado : lista
        )
    })),
    removerlista: (listaId: number) => set((state) => ({
        listas: state.listas.filter(lista => lista.id !== listaId)
    })),
    limparlistas: () => set({ listas: [], listaSelecionado: null })
}))

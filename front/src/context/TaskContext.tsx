import { create } from "zustand";
import type { TaskType } from "../utils/TaskType";

type TaskStore = {
    tasks: TaskType[]
    taskSelecionado: TaskType | null
    carregartasks: (tasksCarregados: TaskType[]) => void
    selecionartask: (task: TaskType) => void
    adicionartask: (novotask: TaskType) => void
    atualizartask: (taskAtualizado: TaskType) => void
    removertask: (taskId: number) => void
    limpartasks: () => void
}

export const usetaskStore = create<TaskStore>((set) => ({
    tasks: [],
    taskSelecionado: null,
    carregartasks: (tasksCarregados: TaskType[]) => set({ tasks: tasksCarregados }),
    selecionartask: (task: TaskType) => set({ taskSelecionado: task }),
    adicionartask: (novotask: TaskType) => set((state) => ({
        tasks: [...state.tasks, novotask]
    })),
    atualizartask: (taskAtualizado: TaskType) => set((state) => ({
        tasks: state.tasks.map(task => 
            task.id === taskAtualizado.id ? taskAtualizado : task
        )
    })),
    removertask: (taskId: number) => set((state) => ({
        tasks: state.tasks.filter(task => task.id !== taskId)
    })),
    limpartasks: () => set({ tasks: [], taskSelecionado: null })
}))

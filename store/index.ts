import create from 'zustand'
import type { Task } from '@prisma/client'

type EditedTask = Omit<Task, 'createdAt' | 'updatedAt' | 'userId'>

type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

const useStore = create<State>((set) => ({
  editedTask: { id: '', title: '', completed: false },
  updateEditedTask: (payload) =>
    set({
      editedTask: payload,
    }),
  resetEditedTask: () =>
    set({ editedTask: { id: '', title: '', completed: false } }),
}))

export default useStore

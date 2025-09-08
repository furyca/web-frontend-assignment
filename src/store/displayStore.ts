import { create } from 'zustand'
import type { ButtonStatus } from './types'

type DisplayState = {
  activeLink: ButtonStatus
  setActiveLink: (link: ButtonStatus) => void
}
const useDisplayStore = create<DisplayState>((set) => ({
  activeLink: "both",
  setActiveLink: (link) => set({ activeLink: link }),
}))

export default useDisplayStore

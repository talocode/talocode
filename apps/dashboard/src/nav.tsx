import { createContext, useContext } from 'react'
import type { Section } from './types'

const NavContext = createContext<{ navigate: (section: Section) => void }>({
  navigate: () => {},
})

export const NavProvider = NavContext.Provider

export function useNavigate() {
  return useContext(NavContext).navigate
}

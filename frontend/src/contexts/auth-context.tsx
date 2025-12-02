import { createContext, useState } from 'react'
import { LocalStorage } from '@/lib/local-storage'

interface User {
  token: string
  id: string
  name: string
  email: string
}

interface AuthContextProps {
  loggedUser: User | null
  updateLoggedUser: (user: User) => void
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

function validateUserData(data: unknown): data is User {
  if (!data || typeof data !== 'object') return false
  const user = data as Record<string, unknown>
  return (
    typeof user.token === 'string' &&
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.email === 'string'
  )
}

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(() => {
    const storedUser = LocalStorage.getUser()

    if (!storedUser) return null

    const parsedUser = JSON.parse(storedUser)
    return validateUserData(parsedUser) ? parsedUser : null
  })

  const updateLoggedUser = (user: User) => {
    setLoggedUser(user)
    LocalStorage.setUser(user)
  }

  const logout = () => {
    setLoggedUser(null)
    LocalStorage.removeUser()
  }

  return (
    <AuthContext.Provider value={{ loggedUser, updateLoggedUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

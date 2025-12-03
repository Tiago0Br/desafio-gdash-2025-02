import { createContext, useState } from 'react'
import { LocalStorage, type StoredUserData } from '@/lib/local-storage'

interface AuthContextProps {
  loggedUser: StoredUserData | null
  getLoggedUser: () => StoredUserData
  updateLoggedUser: (user: StoredUserData) => void
  logout: () => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

function validateUserData(data: unknown): data is StoredUserData {
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
  const [loggedUser, setLoggedUser] = useState<StoredUserData | null>(() => {
    const storedUser = LocalStorage.getUser()

    if (!storedUser) return null

    return validateUserData(storedUser) ? storedUser : null
  })

  const getLoggedUser = () => {
    if (!loggedUser) throw new Error('There is no logged user')
    return loggedUser
  }

  const updateLoggedUser = (user: StoredUserData) => {
    setLoggedUser(user)
    LocalStorage.setUser(user)
  }

  const logout = () => {
    setLoggedUser(null)
    LocalStorage.removeUser()
  }

  return (
    <AuthContext.Provider
      value={{ loggedUser, getLoggedUser, updateLoggedUser, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

import { createContext, useState } from 'react'

const STORAGE_KEY = '@weather-stack:user'

interface User {
  token: string
  id: string
  name: string
  email: string
}

interface AuthContextProps {
  loggedUser: User | null
  updateLoggedUser: (user: User) => void
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps
)

export const AuthContextProvider = ({ children }: AuthProviderProps) => {
  const [loggedUser, setLoggedUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY)
    return storedUser ? JSON.parse(storedUser) : null
  })

  const updateLoggedUser = (user: User) => {
    setLoggedUser(user)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  }

  return (
    <AuthContext.Provider value={{ loggedUser, updateLoggedUser }}>
      {children}
    </AuthContext.Provider>
  )
}

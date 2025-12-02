import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '@/contexts/auth-context'

export function AppLayout() {
  const { loggedUser } = useContext(AuthContext)

  if (!loggedUser) {
    return <Navigate to="/auth" />
  }

  return <Outlet />
}

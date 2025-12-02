import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'

export function AppLayout() {
  const { loggedUser } = useAuth()

  if (!loggedUser) {
    return <Navigate to="/auth" />
  }

  return <Outlet />
}

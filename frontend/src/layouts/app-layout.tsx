import { LogOut, ThermometerSun } from 'lucide-react'
import { Navigate, Outlet } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { getFirstName } from '@/utils/get-first-name'

export function AppLayout() {
  const { loggedUser, logout } = useAuth()

  if (!loggedUser) {
    return <Navigate to="/auth" />
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-zinc-800 px-6 shadow-sm">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <ThermometerSun className="h-6 w-6" />
          <span>WeatherStack</span>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <span className="hidden sm:block text-sm text-muted-foreground">
            Olá, {getFirstName(loggedUser.name)}
          </span>
          <Button variant="outline" size="icon" onClick={logout}>
            <LogOut className="size-4" />
          </Button>
        </div>
      </header>
      <Outlet />
    </div>
  )
}

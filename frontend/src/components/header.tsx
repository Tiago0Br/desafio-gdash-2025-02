import {
  Gauge,
  LogOut,
  MenuIcon,
  Sparkle,
  ThermometerSun,
  User
} from 'lucide-react'
import { Button } from './ui/button'
import { useAuth } from '@/hooks/use-auth'
import { Navigate, useNavigate } from 'react-router-dom'
import { getFirstName } from '@/utils/get-first-name'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from './ui/dropdown-menu'

export function Header() {
  const { loggedUser, logout } = useAuth()
  const navigate = useNavigate()

  if (!loggedUser) {
    return <Navigate to="/auth" replace />
  }

  function handleLogout() {
    logout()
    navigate('/auth', { replace: true })
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-4 border-b bg-zinc-800 px-6 shadow-sm">
      <div className="flex items-center gap-2 font-bold text-xl text-primary">
        <ThermometerSun className="h-6 w-6" />
        <span>WeatherStack</span>
      </div>
      <nav className="hidden sm:flex gap-1">
        <a
          href="/"
          data-active={window.location.pathname === '/'}
          className="flex items-center font-semibold gap-2 px-4 py-2 rounded-md hover:bg-cyan-500 transition-colors data-[active=true]:bg-cyan-500"
        >
          <Gauge className="size-5" />
          Dashboard
        </a>
        <a
          href="/users"
          data-active={window.location.pathname.includes('/users')}
          className="flex items-center font-semibold gap-2 px-4 py-2 rounded-md hover:bg-cyan-500 transition-colors data-[active=true]:bg-cyan-500"
        >
          <User className="size-5" />
          Users
        </a>
        <a
          href="/star-wars"
          data-active={window.location.pathname === '/star-wars'}
          className="flex items-center font-semibold gap-2 px-4 py-2 rounded-md hover:bg-cyan-500 transition-colors data-[active=true]:bg-cyan-500"
        >
          <Sparkle className="size-5" />
          Star Wars
        </a>
      </nav>
      <div className="hidden sm:flex items-center gap-4">
        <span className="block text-sm text-muted-foreground">
          Olá, {getFirstName(loggedUser.name)}
        </span>
        <Button variant="outline" size="icon" onClick={handleLogout}>
          <LogOut className="size-4" />
        </Button>
      </div>
      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Olá, {getFirstName(loggedUser.name)}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex">
              <Gauge className="size-5" />
              <a href="/">Dashboard</a>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex">
              <User className="size-5" />
              <a href="/users">Users</a>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex">
              <Sparkle className="size-5" />
              <a href="/star-wars">Star Wars</a>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

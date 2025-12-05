import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/app-layout'
import { AuthPage } from './pages/auth'
import { DashboardPage } from './pages/dashboard'
import { UsersPage } from './pages/users'
import { UpdateUserPage } from './pages/update-user'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      },
      {
        path: '/users',
        element: <UsersPage />
      },
      {
        path: '/users/update',
        element: <UpdateUserPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
])

import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/app-layout'
import { AuthPage } from './pages/auth'
import { DashboardPage } from './pages/dashboard'
import { UsersPage } from './pages/users'
import { UpdateUserPage } from './pages/update-user'
import { NotFoundPage } from './pages/not-found'
import { StarWarsPage } from './pages/star-wars'

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
      },
      {
        path: '/star-wars',
        element: <StarWarsPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  }
])

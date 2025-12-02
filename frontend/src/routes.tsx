import { createBrowserRouter } from 'react-router-dom'
import { AppLayout } from './layouts/app-layout'
import { AuthPage } from './pages/auth'
import { DashboardPage } from './pages/dashboard'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        path: '',
        element: <DashboardPage />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthPage />
  }
])

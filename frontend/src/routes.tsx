import { createBrowserRouter } from 'react-router-dom'
import { AuthPage } from './pages/auth'

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <AuthPage />
  }
])

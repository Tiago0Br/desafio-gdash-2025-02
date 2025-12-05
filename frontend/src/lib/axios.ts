import axios from 'axios'
import { env } from '@/env'
import { redirectUnauthorizedUser } from '@/http/interceptors/redirect-unauthorized-user'
import { setTokenToRequest } from '@/http/interceptors/set-token-to-request'

export const api = axios.create({
  baseURL: `${env.VITE_API_URL}/api`
})

api.interceptors.request.use(setTokenToRequest, (error) =>
  Promise.reject(error)
)

api.interceptors.response.use((response) => response, redirectUnauthorizedUser)

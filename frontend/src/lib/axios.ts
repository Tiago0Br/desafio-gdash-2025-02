import axios from 'axios'
import { setTokenToRequest } from '@/http/interceptors/set-token-to-request'

export const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`
})

api.interceptors.request.use(setTokenToRequest, (error) =>
  Promise.reject(error)
)

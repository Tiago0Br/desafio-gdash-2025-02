import type { InternalAxiosRequestConfig } from 'axios'
import { LocalStorage } from '@/lib/local-storage'

export function setTokenToRequest(config: InternalAxiosRequestConfig) {
  const storedUser = LocalStorage.getUser()
  if (storedUser?.token) {
    config.headers.Authorization = `Bearer ${storedUser.token}`
  }

  return config
}

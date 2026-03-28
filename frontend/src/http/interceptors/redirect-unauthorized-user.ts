import { isAxiosError } from 'axios'
import { LocalStorage } from '@/lib/local-storage'

export function redirectUnauthorizedUser(error: unknown) {
  if (isAxiosError(error)) {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === 'Unauthorized'
    ) {
      LocalStorage.removeUser()
      if (!window.location.pathname.includes('/auth')) {
        window.location.href = '/auth'
      }
    }
  }
  return Promise.reject(error)
}

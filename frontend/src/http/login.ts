import { isAxiosError } from 'axios'
import type { ApiError } from '@/types'
import { api } from '../lib/axios'

interface LoginRequestBody {
  email: string
  password: string
}

interface LoginResponse {
  token: string
}

export async function login({ email, password }: LoginRequestBody) {
  try {
    const response = await api.post<LoginResponse>('/auth', {
      email,
      password
    })

    return response.data.token
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ApiError
      if (errorData.statusCode === 401) {
        throw new Error('Credenciais inválidas')
      }
    }

    throw new Error('Erro ao fazer login')
  }
}

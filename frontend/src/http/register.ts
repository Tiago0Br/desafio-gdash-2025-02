import { isAxiosError } from 'axios'
import { api } from '@/lib/axios'
import type { ApiError } from '@/types'

interface RegisterRequestBody {
  name: string
  email: string
  password: string
}

interface RegisterResponse {
  user: {
    id: string
    name: string
    email: string
  }
}

export async function register({ name, email, password }: RegisterRequestBody) {
  try {
    const response = await api.post<RegisterResponse>('/users', {
      name,
      email,
      password
    })

    return response.data.user
  } catch (error) {
    if (isAxiosError(error) && error.response?.data) {
      const errorData = error.response.data as ApiError
      if (errorData.statusCode === 400) {
        throw new Error('E-mail já cadastrado!')
      }
    }

    throw new Error('Erro ao registrar usuário')
  }
}

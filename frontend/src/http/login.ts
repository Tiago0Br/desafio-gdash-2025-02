import { getMessageByApiError } from '@/utils/get-message-by-api-error'
import { api } from '../lib/axios'

interface LoginRequestBody {
  email: string
  password: string
}

interface LoginResponse {
  access_token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export async function login({ email, password }: LoginRequestBody) {
  try {
    const response = await api.post<LoginResponse>('/auth', {
      email,
      password
    })

    return response.data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}

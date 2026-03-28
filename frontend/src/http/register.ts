import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

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
    throw new Error(getMessageByApiError(error))
  }
}

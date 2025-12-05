import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

interface UpdateUser {
  name: string
  email: string
  password: string
}

interface UpdateUserResponse {
  user: {
    id: string
    name: string
    email: string
  }
}

export async function updateUser({ name, email, password }: UpdateUser) {
  try {
    const response = await api.put<UpdateUserResponse>('/users', {
      name,
      email,
      password
    })

    return response.data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}

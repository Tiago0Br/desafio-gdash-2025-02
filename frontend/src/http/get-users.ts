import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

interface User {
  id: string
  name: string
  email: string
}

interface GetUsersResponse {
  users: User[]
}

export async function getUsers() {
  try {
    const response = await api.get<GetUsersResponse>('/users')
    const { users } = response.data

    return users
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}

import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

export async function deleteUser() {
  try {
    await api.delete('/users')
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}

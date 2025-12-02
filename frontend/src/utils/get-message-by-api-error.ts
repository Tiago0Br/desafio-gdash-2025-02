import { isAxiosError } from 'axios'
import type { ApiError } from '@/types'

const ERROR_MESSAGES: Record<string, string> = {
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  USER_NOT_FOUND: 'Usuário não encontrado',
  USER_ALREADY_EXISTS: 'E-mail já cadastrado.',
  COULD_NOT_GENERATE_FILE: 'Não foi possível gerar o arquivo.',
  AI_RESPONSE_NOT_AVAILABLE: 'Não foi possível gerar a resposta da IA.',
  INTERNAL_SERVER_ERROR: 'Erro interno do servidor'
}

export function getMessageByApiError(error: unknown) {
  if (isAxiosError(error) && error.response?.data) {
    const errorData = error.response.data as ApiError
    const message = ERROR_MESSAGES[errorData.error]
    if (message) {
      return message
    }
  }

  console.log(error)
  return ERROR_MESSAGES.INTERNAL_SERVER_ERROR
}

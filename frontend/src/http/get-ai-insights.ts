import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

interface GetAiInsightsResponse {
  analysis: string
  recommendation: string
}

export async function getAiInsights() {
  try {
    const response = await api.get<GetAiInsightsResponse>('/weather/insights')

    return response.data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}

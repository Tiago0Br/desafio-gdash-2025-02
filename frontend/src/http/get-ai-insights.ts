import { api } from '@/lib/axios'

interface GetAiInsightsResponse {
  analysis: string
  recommendation: string
}

export async function getAiInsights() {
  const response = await api.get<GetAiInsightsResponse>('/weather/insights')

  return response.data
}

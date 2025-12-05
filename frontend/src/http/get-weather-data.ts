import { api } from '@/lib/axios'
import { getMessageByApiError } from '@/utils/get-message-by-api-error'

export interface WeatherData {
  id: string
  temperature: number
  humidity: number
  windSpeed: number
  rainProbability: number
  createdAt: string
}

interface GetWeatherDataResponse {
  data: WeatherData[]
}

export async function getWeatherData() {
  try {
    const response = await api.get<GetWeatherDataResponse>('/weather/logs')

    const { data } = response.data

    return data
  } catch (error) {
    throw new Error(getMessageByApiError(error))
  }
}

import { api } from '@/lib/axios'

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
  const response = await api.get<GetWeatherDataResponse>('/weather/logs')

  const { data } = response.data

  return data
}

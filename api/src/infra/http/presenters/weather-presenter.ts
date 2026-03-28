import { Weather } from '@/domain/weather/entities/weather'

export class WeatherPresenter {
  static present(weather: Weather) {
    return {
      id: weather.id,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      rainProbability: weather.rainProbability,
      createdAt: weather.collectedAt
    }
  }
}

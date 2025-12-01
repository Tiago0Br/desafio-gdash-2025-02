import { Weather } from '@/domain/weather/entities/weather'

export class WeatherPresenter {
  static present(weather: Weather) {
    return {
      id: weather.id,
      city: weather.city,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      rainProbability: weather.rainProbability,
      weatherCode: weather.weatherCode,
      createdAt: weather.collectedAt
    }
  }
}

import { Weather } from '@/domain/weather/entities/weather'
import { WeatherModel } from '@/infra/database/schemas/weather.schema'

export class MongooseWeatherMapper {
  static toDomain(raw: WeatherModel): Weather {
    return Weather.create(raw, raw._id)
  }

  static toMongoose(weather: Weather): WeatherModel {
    return {
      _id: weather.id,
      temperature: weather.temperature,
      humidity: weather.humidity,
      windSpeed: weather.windSpeed,
      rainProbability: weather.rainProbability,
      collectedAt: weather.collectedAt
    }
  }
}

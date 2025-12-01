import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaginationParams } from '@/core/types/pagination-params'
import { Weather } from '@/domain/weather/entities/weather'
import {
  WeatherRepository,
  WeatherWeeklyStats
} from '@/domain/weather/repositories/weather-repository'
import { WeatherModel } from '@/infra/database/schemas/weather.schema'
import { MongooseWeatherMapper } from '../mappers/mongoose-weather-mapper'

@Injectable()
export class MongooseWeatherRepository implements WeatherRepository {
  constructor(
    @InjectModel(WeatherModel.name) private weatherModel: Model<WeatherModel>
  ) {}

  async create(weather: Weather): Promise<void> {
    await this.weatherModel.create(MongooseWeatherMapper.toMongoose(weather))
  }

  async save(weather: Weather): Promise<void> {
    await this.weatherModel
      .updateOne({ _id: weather.id }, MongooseWeatherMapper.toMongoose(weather))
      .exec()
  }

  async findAll(params: PaginationParams): Promise<Weather[]> {
    const weather = await this.weatherModel
      .find()
      .sort({ collectedAt: -1 })
      .skip(params.offset)
      .limit(params.limit)
      .exec()

    return weather.map(MongooseWeatherMapper.toDomain)
  }

  async findAllInArray(params: PaginationParams): Promise<unknown[]> {
    const weather = await this.weatherModel
      .find()
      .sort({ collectedAt: -1 })
      .skip(params.offset)
      .limit(params.limit)
      .lean()
      .exec()

    return weather
  }

  async findMostRecent(): Promise<Weather | null> {
    const weather = await this.weatherModel.findOne().sort({ collectedAt: -1 }).exec()

    return weather ? MongooseWeatherMapper.toDomain(weather) : null
  }

  async getWeeklyStats(): Promise<WeatherWeeklyStats | null> {
    const data = (await this.weatherModel.aggregate([
      {
        $group: {
          _id: null,
          avgTemperature: { $avg: '$temperature' },
          maxTemperature: { $max: '$temperature' },
          minTemperature: { $min: '$temperature' },
          avgHumidity: { $avg: '$humidity' },
          maxWindSpeed: { $max: '$windSpeed' },
          avgRainProbability: { $avg: '$rainProbability' }
        }
      }
    ])) as WeatherWeeklyStats[]

    return data.length > 0 ? data[0] : null
  }
}

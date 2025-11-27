import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Weather } from './schemas/weather.schema'

@Injectable()
export class WeatherService {
  constructor(@InjectModel('Weather') private weatherModel: Model<Weather>) {}

  async create(weather: Weather) {
    const createdWeather = new this.weatherModel(weather)
    return createdWeather.save()
  }

  async findAll() {
    return this.weatherModel.find().exec()
  }

  async findMostRecent() {
    return this.weatherModel.findOne().sort({ collectedAt: -1 }).exec()
  }
}

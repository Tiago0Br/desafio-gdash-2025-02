import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import * as ExcelJS from 'exceljs'
import { Parser } from 'json2csv'
import { Model } from 'mongoose'
import { Weather } from './schemas/weather.schema'

@Injectable()
export class WeatherService {
  constructor(@InjectModel('Weather') private weatherModel: Model<Weather>) {}

  async create(weather: Weather) {
    const createdWeather = new this.weatherModel(weather)
    return createdWeather.save()
  }

  async findAll(limit = 20, offset = 0) {
    return this.weatherModel.find().skip(offset).limit(limit).exec()
  }

  async findAndExportCsv(limit: number) {
    const data = await this.weatherModel
      .find()
      .sort({ collectedAt: -1 })
      .limit(limit)
      .lean()
      .exec()

    const fields = [
      'city',
      'temperature',
      'humidity',
      'windSpeed',
      'weatherCode',
      'rainProbability',
      'collectedAt'
    ]

    const json2csvParser = new Parser({ fields })
    const csv = json2csvParser.parse(data)

    return csv
  }

  async findAndExportXlsx(limit: number) {
    const data = await this.weatherModel
      .find()
      .sort({ collectedAt: -1 })
      .limit(limit)
      .lean()
      .exec()

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Weather Logs')

    worksheet.columns = [
      { header: 'City', key: 'city', width: 32 },
      { header: 'Temperature', key: 'temperature', width: 16 },
      { header: 'Humidity', key: 'humidity', width: 16 },
      { header: 'Wind Speed', key: 'windSpeed', width: 16 },
      { header: 'Weather Code', key: 'weatherCode', width: 16 },
      { header: 'Rain Probability', key: 'rainProbability', width: 16 },
      { header: 'Collected At', key: 'collectedAt', width: 32 }
    ]

    worksheet.addRows(data)

    worksheet.getRow(1).font = { bold: true }

    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }
}

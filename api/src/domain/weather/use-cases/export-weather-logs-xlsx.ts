import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { XlsxReporter } from '../reporter/xlsx-reporter'
import { WeatherRepository } from '../repositories/weather-repository'

interface ExportWeatherLogsXlsxUseCaseRequest {
  limit: number
  offset: number
}

type ExportWeatherLogsXlsxUseCaseResponse = Promise<
  Either<null, { xlsxBuffer: Buffer }>
>

@Injectable()
export class ExportWeatherLogsXlsxUseCase {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly xlsxReporter: XlsxReporter
  ) {}

  async execute({
    limit,
    offset
  }: ExportWeatherLogsXlsxUseCaseRequest): ExportWeatherLogsXlsxUseCaseResponse {
    const weatherLogsArray = await this.weatherRepository.findAllInArray({
      limit,
      offset
    })

    const columns = [
      { header: 'City', key: 'city', width: 32 },
      { header: 'Temperature', key: 'temperature', width: 16 },
      { header: 'Humidity', key: 'humidity', width: 16 },
      { header: 'Wind Speed', key: 'windSpeed', width: 16 },
      { header: 'Weather Code', key: 'weatherCode', width: 16 },
      { header: 'Rain Probability', key: 'rainProbability', width: 16 },
      { header: 'Collected At', key: 'collectedAt', width: 32 }
    ]

    const xlsxBuffer = await this.xlsxReporter.generate({
      worksheetName: 'Weather Logs',
      columns,
      rows: weatherLogsArray
    })

    return right({ xlsxBuffer })
  }
}

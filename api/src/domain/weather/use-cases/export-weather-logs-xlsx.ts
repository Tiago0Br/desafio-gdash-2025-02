import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { XlsxReporter } from '../reporter/xlsx-reporter'
import { WeatherRepository } from '../repositories/weather-repository'
import { DateFormatter } from '@/core/date/date-formatter'

interface ExportWeatherLogsXlsxUseCaseRequest {
  limit: number
  offset: number
}

type ExportWeatherLogsXlsxUseCaseResponse = Promise<Either<null, { xlsxBuffer: Buffer }>>

@Injectable()
export class ExportWeatherLogsXlsxUseCase {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly xlsxReporter: XlsxReporter,
    private readonly dateFormatter: DateFormatter
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
      { header: 'Temperatura (°C)', key: 'temperature', width: 16 },
      { header: 'Umidade (%)', key: 'humidity', width: 16 },
      { header: 'Velocidade do vento (km/h)', key: 'windSpeed', width: 16 },
      { header: 'Probabilidade de chuva (%)', key: 'rainProbability', width: 16 },
      { header: 'Coletado em', key: 'collectedAt', width: 32 }
    ]

    const xlsxBuffer = await this.xlsxReporter.generate({
      worksheetName: 'Weather Logs',
      columns,
      rows: weatherLogsArray.map((current) => ({
        ...current,
        collectedAt: this.dateFormatter.format(current.collectedAt)
      }))
    })

    return right({ xlsxBuffer })
  }
}

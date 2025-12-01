import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { CsvReporter } from '../reporter/csv-reporter'
import { WeatherRepository } from '../repositories/weather-repository'

interface ExportWeatherLogsCsvUseCaseRequest {
  limit: number
  offset: number
}

type ExportWeatherLogsCsvUseCaseResponse = Promise<
  Either<null, { csv: string }>
>

@Injectable()
export class ExportWeatherLogsCsvUseCase {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly csvReporter: CsvReporter
  ) {}

  async execute({
    limit,
    offset
  }: ExportWeatherLogsCsvUseCaseRequest): ExportWeatherLogsCsvUseCaseResponse {
    const weatherLogsArray = await this.weatherRepository.findAllInArray({
      limit,
      offset
    })

    const columns = [
      'city',
      'temperature',
      'humidity',
      'windSpeed',
      'weatherCode',
      'rainProbability',
      'collectedAt'
    ]

    const csv = this.csvReporter.generate({
      columns,
      rows: weatherLogsArray
    })

    return right({ csv })
  }
}

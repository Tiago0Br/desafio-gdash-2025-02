import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { CsvReporter } from '../reporter/csv-reporter'
import { WeatherRepository } from '../repositories/weather-repository'
import { DateFormatter } from '@/core/date/date-formatter'

interface ExportWeatherLogsCsvUseCaseRequest {
  limit: number
  offset: number
}

type ExportWeatherLogsCsvUseCaseResponse = Promise<Either<null, { csv: string }>>

@Injectable()
export class ExportWeatherLogsCsvUseCase {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly csvReporter: CsvReporter,
    private readonly dateFormatter: DateFormatter
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
      'temperatura',
      'umidade',
      'velocidade_do_vento',
      'probabilidade_de_chuva',
      'coletado_em'
    ]

    const csv = this.csvReporter.generate({
      columns,
      rows: weatherLogsArray.map((current) => ({
        ...current,
        collectedAt: this.dateFormatter.format(current.collectedAt)
      }))
    })

    return right({ csv })
  }
}

import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { PaginationParams } from '@/core/types/pagination-params'
import { Weather } from '../entities/weather'
import { WeatherRepository } from '../repositories/weather-repository'

type GetWeatherLogsUseCaseRequest = PaginationParams

type GetWeatherLogsUseCaseResponse = Promise<
  Either<null, { weatherLogs: Weather[] }>
>

@Injectable()
export class GetWeatherLogsUseCase {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute({
    limit,
    offset
  }: GetWeatherLogsUseCaseRequest): GetWeatherLogsUseCaseResponse {
    const weatherLogs = await this.weatherRepository.findAll({ limit, offset })

    return right({ weatherLogs })
  }
}

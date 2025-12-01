import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { Weather } from '../entities/weather'
import { WeatherRepository } from '../repositories/weather-repository'

interface SaveWeatherLogsUseCaseRequest {
  weather: Weather
}

type SaveWeatherLogsUseCaseResponse = Promise<
  Either<null, { weather: Weather }>
>

@Injectable()
export class SaveWeatherLogsUseCase {
  constructor(private readonly weatherRepository: WeatherRepository) {}

  async execute({
    weather
  }: SaveWeatherLogsUseCaseRequest): SaveWeatherLogsUseCaseResponse {
    await this.weatherRepository.create(weather)

    return right({ weather })
  }
}

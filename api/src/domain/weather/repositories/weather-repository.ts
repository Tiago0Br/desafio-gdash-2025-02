import { PaginationParams } from '@/core/types/pagination-params'
import { Weather } from '../entities/weather'

export interface WeatherWeeklyStats {
  avgTemperature: number
  maxTemperature: number
  minTemperature: number
  avgHumidity: number
  maxWindSpeed: number
  avgRainProbability: number
}

export abstract class WeatherRepository {
  abstract create(weather: Weather): Promise<void>

  abstract save(weather: Weather): Promise<void>

  abstract findAll(params: PaginationParams): Promise<Weather[]>

  abstract findAllInArray(params: PaginationParams): Promise<unknown[]>

  abstract findMostRecent(): Promise<Weather | null>

  abstract getWeeklyStats(): Promise<WeatherWeeklyStats | null>
}

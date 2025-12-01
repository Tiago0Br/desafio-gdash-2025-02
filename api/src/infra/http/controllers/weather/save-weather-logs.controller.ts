import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { Weather } from '@/domain/weather/entities/weather'
import { SaveWeatherLogsUseCase } from '@/domain/weather/use-cases/save-weather-logs'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const createWeatherRecordsBodySchema = z.object({
  city: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  wind_speed: z.number().default(0),
  weather_code: z.number(),
  rain_probability: z.number(),
  collected_at: z.string()
})

type CreateWeatherRecordsBodySchema = z.infer<typeof createWeatherRecordsBodySchema>

const zodValidationPipe = new ZodValidationPipe(createWeatherRecordsBodySchema)

@Controller('/weather')
export class SaveWeatherLogsController {
  constructor(private readonly saveWeatherLogs: SaveWeatherLogsUseCase) {}

  @Public()
  @Post()
  async handle(@Body(zodValidationPipe) body: CreateWeatherRecordsBodySchema) {
    const weather = Weather.create({
      city: body.city,
      temperature: body.temperature,
      humidity: body.humidity,
      windSpeed: body.wind_speed,
      weatherCode: body.weather_code,
      rainProbability: body.rain_probability,
      collectedAt: body.collected_at
    })

    await this.saveWeatherLogs.execute({ weather })

    return {
      message: 'Weather logs saved successfully'
    }
  }
}

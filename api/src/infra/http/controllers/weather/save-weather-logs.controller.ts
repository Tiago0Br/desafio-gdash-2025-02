import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import z from 'zod'
import { Weather } from '@/domain/weather/entities/weather'
import { SaveWeatherLogsUseCase } from '@/domain/weather/use-cases/save-weather-logs'
import { WorkerAuthGuard } from '@/infra/auth/guards/worker-auth.guard'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const createWeatherRecordsBodySchema = z.object({
  temperature: z.number(),
  humidity: z.number(),
  wind_speed: z.number().default(0),
  rain_probability: z.number(),
  collected_at: z.string()
})

type CreateWeatherRecordsBodySchema = z.infer<typeof createWeatherRecordsBodySchema>

const zodValidationPipe = new ZodValidationPipe(createWeatherRecordsBodySchema)

@Controller('/weather')
export class SaveWeatherLogsController {
  constructor(private readonly saveWeatherLogs: SaveWeatherLogsUseCase) {}

  @Public()
  @UseGuards(WorkerAuthGuard)
  @Post()
  async handle(@Body(zodValidationPipe) body: CreateWeatherRecordsBodySchema) {
    const weather = Weather.create({
      temperature: body.temperature,
      humidity: body.humidity,
      windSpeed: body.wind_speed,
      rainProbability: body.rain_probability,
      collectedAt: body.collected_at
    })

    await this.saveWeatherLogs.execute({ weather })

    return {
      message: 'Weather logs saved successfully'
    }
  }
}

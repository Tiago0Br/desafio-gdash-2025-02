import { Controller, Get, Query } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { WeatherService } from './weather.service'

const getWeatherLogsQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(20).default(20),
  offset: z.coerce.number().min(0).default(0)
})

type GetWeatherLogsQuerySchema = z.infer<typeof getWeatherLogsQuerySchema>

const zodValidationPipe = new ZodValidationPipe(getWeatherLogsQuerySchema)

@Controller('/api/weather/logs')
export class GetWeatherLogsController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async handle(
    @Query(zodValidationPipe) { limit, offset }: GetWeatherLogsQuerySchema
  ) {
    const weatherLogs = await this.weatherService.findAll(limit, offset)

    return weatherLogs
  }
}

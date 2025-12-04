import { Controller, Get, Query } from '@nestjs/common'
import z from 'zod'
import { GetWeatherLogsUseCase } from '@/domain/weather/use-cases/get-weather-logs'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { WeatherPresenter } from '@/infra/http/presenters/weather-presenter'

const getWeatherLogsQuerySchema = z.object({
  limit: z.coerce.number().min(1).max(20).default(20),
  offset: z.coerce.number().min(0).default(0)
})

type GetWeatherLogsQuerySchema = z.infer<typeof getWeatherLogsQuerySchema>

const zodValidationPipe = new ZodValidationPipe(getWeatherLogsQuerySchema)

@Controller('/weather/logs')
export class GetWeatherLogsController {
  constructor(private readonly getWeatherLogs: GetWeatherLogsUseCase) {}

  @Get()
  async handle(@Query(zodValidationPipe) { limit, offset }: GetWeatherLogsQuerySchema) {
    const result = await this.getWeatherLogs.execute({ limit, offset })

    const weatherLogs = result.value?.weatherLogs ?? []

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(true)
      }, 6000)
    })

    return {
      data: weatherLogs.map(WeatherPresenter.present)
    }
  }
}

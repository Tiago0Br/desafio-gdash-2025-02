import { ConflictException, Controller, Get } from '@nestjs/common'
import { GetWeatherAiInsightsUseCase } from '@/domain/weather/use-cases/get-weather-ai-insights'
import { ERROR_CODES } from '@/infra/http/error-codes'

@Controller('/weather/insights')
export class GetWeatherAiInsightsController {
  constructor(private getWeatherAiInsightsUseCase: GetWeatherAiInsightsUseCase) {}

  @Get()
  async handle() {
    const result = await this.getWeatherAiInsightsUseCase.execute()

    if (result.isLeft()) {
      const error = result.value

      throw new ConflictException(error.message, {
        description: ERROR_CODES.aiResponseNotAvailable
      })
    }

    const { insights } = result.value

    return insights
  }
}

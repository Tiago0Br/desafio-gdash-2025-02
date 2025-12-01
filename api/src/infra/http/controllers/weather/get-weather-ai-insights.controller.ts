import { ConflictException, Controller, Get } from '@nestjs/common'
import { GetWeatherAiInsightsUseCase } from '@/domain/weather/use-cases/get-weather-ai-insights'

@Controller('/weather/insights')
export class GetWeatherAiInsightsController {
  constructor(private getWeatherAiInsightsUseCase: GetWeatherAiInsightsUseCase) {}

  @Get()
  async handle() {
    const result = await this.getWeatherAiInsightsUseCase.execute()

    if (result.isLeft()) {
      const error = result.value

      throw new ConflictException(error.message)
    }

    const { insights } = result.value

    return {
      insights
    }
  }
}

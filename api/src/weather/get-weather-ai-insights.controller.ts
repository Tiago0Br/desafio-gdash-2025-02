import { Controller, Get } from '@nestjs/common'
import { WeatherService } from './weather.service'

@Controller('/api/weather/insights')
export class GetWeatherAiInsightsController {
  constructor(private weatherService: WeatherService) {}

  @Get()
  async handle() {
    const insights = await this.weatherService.generateAiInsights()

    return {
      insights
    }
  }
}

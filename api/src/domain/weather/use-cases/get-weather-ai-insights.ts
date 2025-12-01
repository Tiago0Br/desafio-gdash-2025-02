import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { AiAgent } from '../ai/ai-agent'
import { getWeatherInsightsPrompt } from '../ai/prompts/get-weather-insights-prompt'
import { AiResponseNotAvailableError } from '../errors/ai-response-not-available-error'
import { InsuficientDataForAiInsightsError } from '../errors/insuficient-data-for-ai-insights-error'
import { WeatherRepository } from '../repositories/weather-repository'

type GetWeatherAiInsightsUseCaseResponse = Promise<
  Either<
    InsuficientDataForAiInsightsError | AiResponseNotAvailableError,
    { insights: string }
  >
>

@Injectable()
export class GetWeatherAiInsightsUseCase {
  constructor(
    private readonly weatherRepository: WeatherRepository,
    private readonly aiAgent: AiAgent
  ) {}

  async execute(): GetWeatherAiInsightsUseCaseResponse {
    const mostRecentLog = await this.weatherRepository.findMostRecent()

    if (!mostRecentLog) {
      return left(new InsuficientDataForAiInsightsError())
    }

    const weeklyStats = await this.weatherRepository.getWeeklyStats()
    const prompt = getWeatherInsightsPrompt({
      mostRecentLog,
      weeklyStats
    })

    const insights = await this.aiAgent.generateContent(prompt)

    if (!insights) {
      return left(new AiResponseNotAvailableError())
    }

    return right({ insights })
  }
}

import { Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { WeatherService } from './weather.service'

const createWeatherRecordsBodySchema = z.object({
  city: z.string(),
  temperature: z.number(),
  humidity: z.number(),
  wind_speed: z.number().default(0),
  weather_code: z.number(),
  rain_probability: z.number(),
  collected_at: z.string()
})

type CreateWeatherRecordsBodySchema = z.infer<
  typeof createWeatherRecordsBodySchema
>

const zodValidationPipe = new ZodValidationPipe(createWeatherRecordsBodySchema)

@Controller('/weather')
export class CreateWeatherRecordsController {
  constructor(private readonly weatherService: WeatherService) {}

  @Public()
  @Post()
  async handle(@Body(zodValidationPipe) body: CreateWeatherRecordsBodySchema) {
    await this.weatherService.create({
      city: body.city,
      temperature: body.temperature,
      humidity: body.humidity,
      windSpeed: body.wind_speed,
      weatherCode: body.weather_code,
      rainProbability: body.rain_probability,
      collectedAt: body.collected_at
    })

    return {
      message: 'Weather records created successfully'
    }
  }
}

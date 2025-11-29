import { Controller, Get, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import { ZodValidationPipe } from 'src/http/pipes/zod-validation.pipe'
import z from 'zod'
import { WeatherService } from './weather.service'

const defaultLimit = 1000 // set default limit to 1000 records

const exportWeatherDataCsvQuerySchema = z.object({
  limit: z.coerce.number().default(defaultLimit)
})

type ExportWeatherDataCsvQuerySchema = z.infer<
  typeof exportWeatherDataCsvQuerySchema
>

const zodValidationPipe = new ZodValidationPipe(exportWeatherDataCsvQuerySchema)

@Controller('/api/weather/export/csv')
export class ExportWeatherDataCsvController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async handle(
    @Res() res: Response,
    @Query(zodValidationPipe) { limit }: ExportWeatherDataCsvQuerySchema
  ) {
    const csv = await this.weatherService.findAllCsv(limit)

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': 'attachment; filename="clima_logs.csv"'
    })

    res.send(csv)
  }
}

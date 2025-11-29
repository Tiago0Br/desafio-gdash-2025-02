import { Controller, Get, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import { ZodValidationPipe } from 'src/http/pipes/zod-validation.pipe'
import z from 'zod'
import { WeatherService } from './weather.service'

const defaultLimit = 1000 // set default limit to 1000 records

const exportWeatherDataXlsxQuerySchema = z.object({
  limit: z.coerce.number().default(defaultLimit)
})

type ExportWeatherDataXlsxQuerySchema = z.infer<
  typeof exportWeatherDataXlsxQuerySchema
>

const zodValidationPipe = new ZodValidationPipe(
  exportWeatherDataXlsxQuerySchema
)

@Controller('/api/weather/export/xlsx')
export class ExportWeatherDataXlsxController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get()
  async handle(
    @Res() res: Response,
    @Query(zodValidationPipe) { limit }: ExportWeatherDataXlsxQuerySchema
  ) {
    const buffer = await this.weatherService.findAndExportXlsx(limit)

    res.set({
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="clima_logs.xlsx"',
      'Content-Length': buffer.length.toString()
    })

    res.end(buffer)
  }
}

import { ConflictException, Controller, Get, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import z from 'zod'
import { ExportWeatherLogsCsvUseCase } from '@/domain/weather/use-cases/export-weather-logs-csv'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const defaultLimit = 1000 // set default limit to 1000 records

const exportWeatherLogsCsvQuerySchema = z.object({
  limit: z.coerce.number().default(defaultLimit),
  offset: z.coerce.number().default(0)
})

type ExportWeatherLogsCsvQuerySchema = z.infer<typeof exportWeatherLogsCsvQuerySchema>

const zodValidationPipe = new ZodValidationPipe(exportWeatherLogsCsvQuerySchema)

@Controller('/weather/export/csv')
export class ExportWeatherLogsCsvController {
  constructor(private readonly exportWeatherLogsCsv: ExportWeatherLogsCsvUseCase) {}

  @Get()
  async handle(
    @Res() res: Response,
    @Query(zodValidationPipe) { limit, offset }: ExportWeatherLogsCsvQuerySchema
  ) {
    const result = await this.exportWeatherLogsCsv.execute({ limit, offset })
    const outputFilename = `weather_logs_${new Date().toISOString()}.csv`

    if (result.isLeft()) {
      throw new ConflictException('Failed to generate CSV file')
    }

    const { csv } = result.value

    res.set({
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="${outputFilename}"`
    })

    res.send(csv)
  }
}

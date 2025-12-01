import { ConflictException, Controller, Get, Query, Res } from '@nestjs/common'
import type { Response } from 'express'
import z from 'zod'
import { ExportWeatherLogsXlsxUseCase } from '@/domain/weather/use-cases/export-weather-logs-xlsx'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const defaultLimit = 1000 // set default limit to 1000 records

const exportWeatherLogsXlsxQuerySchema = z.object({
  limit: z.coerce.number().default(defaultLimit),
  offset: z.coerce.number().default(0)
})

type ExportWeatherLogsXlsxQuerySchema = z.infer<typeof exportWeatherLogsXlsxQuerySchema>

const zodValidationPipe = new ZodValidationPipe(exportWeatherLogsXlsxQuerySchema)

@Controller('/weather/export/xlsx')
export class ExportWeatherLogsXlsxController {
  constructor(private readonly exportWeatherLogsXlsx: ExportWeatherLogsXlsxUseCase) {}

  @Get()
  async handle(
    @Res() res: Response,
    @Query(zodValidationPipe) { limit, offset }: ExportWeatherLogsXlsxQuerySchema
  ) {
    const result = await this.exportWeatherLogsXlsx.execute({ limit, offset })
    const outputFileName = `weather_logs_${new Date().toISOString()}.xlsx`

    if (result.isLeft()) {
      throw new ConflictException('Failed to generate XLSX file')
    }

    const { xlsxBuffer } = result.value

    res.set({
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${outputFileName}"`,
      'Content-Length': xlsxBuffer.length.toString()
    })

    res.end(xlsxBuffer)
  }
}

import { Module } from '@nestjs/common'
import { CsvReporter } from '@/domain/weather/reporter/csv-reporter'
import { XlsxReporter } from '@/domain/weather/reporter/xlsx-reporter'
import { ExcelJsXlsxReporter } from './exceljs-xlsx-reporter'
import { Json2CsvCsvReporter } from './json2csv-csv-reporter'

@Module({
  providers: [
    {
      provide: CsvReporter,
      useClass: Json2CsvCsvReporter
    },
    {
      provide: XlsxReporter,
      useClass: ExcelJsXlsxReporter
    }
  ],
  exports: [CsvReporter, XlsxReporter]
})
export class ReporterModule {}

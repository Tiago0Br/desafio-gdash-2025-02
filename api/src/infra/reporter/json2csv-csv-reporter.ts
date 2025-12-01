import { Injectable } from '@nestjs/common'
import { Parser } from 'json2csv'
import {
  CsvReporter,
  CsvReporterData
} from '@/domain/weather/reporter/csv-reporter'

@Injectable()
export class Json2CsvCsvReporter implements CsvReporter {
  generate({ columns, rows }: CsvReporterData): string {
    const parser = new Parser({ fields: columns })
    const csv = parser.parse(rows)
    return csv
  }
}

import { Injectable } from '@nestjs/common'
import * as ExcelJS from 'exceljs'
import {
  XlsxReporter,
  XlsxReporterData
} from '@/domain/weather/reporter/xlsx-reporter'

@Injectable()
export class ExcelJsXlsxReporter implements XlsxReporter {
  async generate({
    worksheetName,
    columns,
    rows
  }: XlsxReporterData): Promise<Buffer> {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(worksheetName)

    worksheet.columns = columns

    worksheet.addRows(rows)

    worksheet.getRow(1).font = { bold: true }

    const buffer = await workbook.xlsx.writeBuffer()
    return Buffer.from(buffer)
  }
}

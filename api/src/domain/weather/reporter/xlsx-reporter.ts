export interface XlsxReporterData {
  worksheetName: string
  columns: {
    header: string
    key: string
    width?: number
  }[]
  rows: unknown[]
}

export abstract class XlsxReporter {
  abstract generate(data: XlsxReporterData): Promise<Buffer>
}

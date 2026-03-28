export interface CsvReporterData {
  columns: string[]
  rows: unknown[]
}

export abstract class CsvReporter {
  abstract generate(data: CsvReporterData): string
}

import { DateFormatter } from '@/core/date/date-formatter'
import { Injectable } from '@nestjs/common'
import dayjs from 'dayjs'

@Injectable()
export class DayjsDateFormatter implements DateFormatter {
  format(date: string | Date): string {
    return dayjs(date).subtract(3, 'hour').format('DD/MM/YYYY HH:mm')
  }
}

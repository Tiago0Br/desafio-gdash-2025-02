import { Module } from '@nestjs/common'
import { DayjsDateFormatter } from './dayjs-date-formatter'
import { DateFormatter } from '@/core/date/date-formatter'

@Module({
  providers: [
    {
      provide: DateFormatter,
      useClass: DayjsDateFormatter
    }
  ],
  exports: [DateFormatter]
})
export class DateModule {}

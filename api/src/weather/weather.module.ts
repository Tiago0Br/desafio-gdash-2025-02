import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CreateWeatherRecordsController } from './create-weather-records.controller'
import { ExportWeatherDataCsvController } from './export-weather-data-csv.controller'
import { GetWeatherLogsController } from './get-weather-logs.controller'
import { Weather, WeatherSchema } from './schemas/weather.schema'
import { WeatherService } from './weather.service'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Weather.name, schema: WeatherSchema }])
  ],
  controllers: [
    CreateWeatherRecordsController,
    GetWeatherLogsController,
    ExportWeatherDataCsvController
  ],
  providers: [WeatherService],
  exports: [WeatherService]
})
export class WeatherModule {}

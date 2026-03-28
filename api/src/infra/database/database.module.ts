import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UserRepository } from '@/domain/users/repositories/user-repository'
import { WeatherRepository } from '@/domain/weather/repositories/weather-repository'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { EnvModule } from '../env/env.module'
import { MongooseUserRepository } from './repositories/mongoose-user-repository'
import { MongooseWeatherRepository } from './repositories/mongoose-weather-repository'
import { UserModel, UserSchema } from './schemas/user.schema'
import { WeatherModel, WeatherSchema } from './schemas/weather.schema'
import { SeederService } from './seeder.service'

@Module({
  imports: [
    EnvModule,
    CryptographyModule,
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: WeatherModel.name, schema: WeatherSchema }])
  ],
  providers: [
    SeederService,
    {
      provide: UserRepository,
      useClass: MongooseUserRepository
    },
    {
      provide: WeatherRepository,
      useClass: MongooseWeatherRepository
    }
  ],
  exports: [UserRepository, WeatherRepository]
})
export class DatabaseModule {}

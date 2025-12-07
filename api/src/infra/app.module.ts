import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthModule } from './auth/auth.module'
import { envSchema } from './env/env'
import { EnvModule } from './env/env.module'
import { EnvService } from './env/env.service'
import { HttpModule } from './http/http.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: (config) => envSchema.parse(config),
      envFilePath: '../.env'
    }),
    MongooseModule.forRootAsync({
      imports: [EnvModule],
      useFactory: async (envService: EnvService) => ({
        uri: `mongodb://${envService.get('MONGO_USER')}:${envService.get('MONGO_PASSWORD')}@${envService.get('MONGO_HOST')}:${envService.get('MONGO_PORT')}`
      }),
      inject: [EnvService]
    }),
    AuthModule,
    EnvModule,
    HttpModule
  ]
})
export class AppModule {}

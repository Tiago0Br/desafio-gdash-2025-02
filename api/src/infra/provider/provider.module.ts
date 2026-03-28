import { Module } from '@nestjs/common'
import { EnvModule } from '../env/env.module'
import { HttpModule as RequestModule } from '@nestjs/axios'
import { StarWarsProvider } from '@/domain/star-wars/providers/star-wars-provider'
import { SwapiApiProvider } from './swapi-api-provider'

@Module({
  imports: [
    EnvModule,
    RequestModule.register({
      timeout: 5000
    })
  ],
  providers: [
    {
      provide: StarWarsProvider,
      useClass: SwapiApiProvider
    }
  ],
  exports: [StarWarsProvider]
})
export class ProviderModule {}

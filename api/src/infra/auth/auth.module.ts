import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { EnvModule } from '@/infra/env/env.module'
import { EnvService } from '@/infra/env/env.service'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { WorkerAuthGuard } from './guards/worker-auth.guard'
import { JwtStrategy } from './jwt.strategy'

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [EnvModule],
      inject: [EnvService],
      global: true,
      useFactory: (env: EnvService) => {
        const privateKey = env.get('JWT_PRIVATE_KEY')
        const publicKey = env.get('JWT_PUBLIC_KEY')

        return {
          privateKey: Buffer.from(privateKey, 'base64'),
          publicKey: Buffer.from(publicKey, 'base64'),
          signOptions: {
            algorithm: 'RS256',
            expiresIn: '1d'
          }
        }
      }
    }),
    EnvModule
  ],
  providers: [
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard
    },
    WorkerAuthGuard
  ]
})
export class AuthModule {}

import { Module } from '@nestjs/common'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [JwtEncrypter],
  exports: [JwtEncrypter]
})
export class CryptographyModule {}

import { Module } from '@nestjs/common'
import { Encrypter } from '@/domain/users/cryptography/encrypter'
import { Hasher } from '@/domain/users/cryptography/hasher'
import { BcryptHasher } from './bcrypt-hasher'
import { JwtEncrypter } from './jwt-encrypter'

@Module({
  providers: [
    {
      provide: Encrypter,
      useClass: JwtEncrypter
    },
    {
      provide: Hasher,
      useClass: BcryptHasher
    }
  ],
  exports: [Encrypter, Hasher]
})
export class CryptographyModule {}

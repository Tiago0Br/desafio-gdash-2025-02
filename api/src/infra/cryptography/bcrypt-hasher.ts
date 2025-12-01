import { Injectable } from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'
import { Hasher } from '@/domain/users/cryptography/hasher'

@Injectable()
export class BcryptHasher implements Hasher {
  private HASH_SALT_LENGTH = 8

  hash(plain: string): Promise<string> {
    return bcryptjs.hash(plain, this.HASH_SALT_LENGTH)
  }

  compare(plain: string, hashed: string): Promise<boolean> {
    return bcryptjs.compare(plain, hashed)
  }
}

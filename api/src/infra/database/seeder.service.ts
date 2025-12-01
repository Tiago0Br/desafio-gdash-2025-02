import { Injectable, OnModuleInit } from '@nestjs/common'
import { Hasher } from '@/domain/users/cryptography/hasher'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repositories/user-repository'
import { EnvService } from '../env/env.service'

@Injectable()
export class SeederService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly envService: EnvService,
    private readonly hasher: Hasher
  ) {}

  async onModuleInit() {
    await this.seed()
  }

  private async seed() {
    const defaultData = this.getDefaultUserData()
    const email = this.envService.get('DEFAULT_USER_EMAIL') ?? defaultData.email
    const password = this.envService.get('DEFAULT_USER_PASSWORD') ?? defaultData.password

    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      await this.userRepository.create(
        User.create({
          name: defaultData.name,
          email,
          password: await this.hasher.hash(password)
        })
      )
    }
  }

  private getDefaultUserData() {
    return {
      name: 'Default User',
      email: 'default@example.com',
      password: 'password'
    }
  }
}

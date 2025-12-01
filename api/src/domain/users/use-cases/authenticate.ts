import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Encrypter } from '../cryptography/encrypter'
import { Hasher } from '../cryptography/hasher'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { UserRepository } from '../repositories/user-repository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = Promise<
  Either<InvalidCredentialsError, { token: string }>
>

@Injectable()
export class AuthenticateUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly encrypter: Encrypter,
    private readonly hasher: Hasher
  ) {}

  async execute({
    email,
    password
  }: AuthenticateUseCaseRequest): AuthenticateUseCaseResponse {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidCredentialsError())
    }

    const isPasswordValid = await this.hasher.compare(password, user.password)

    if (!isPasswordValid) {
      return left(new InvalidCredentialsError())
    }

    const token = await this.encrypter.encrypt({
      sub: user.id
    })

    return right({ token })
  }
}

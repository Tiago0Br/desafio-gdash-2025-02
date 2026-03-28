import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { UserAlreadyExistsError } from '@/domain/users/errors/user-already-exists-error'
import { Hasher } from '../cryptography/hasher'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'

interface CreateUserUseCaseRequest {
  name: string
  email: string
  password: string
}

type CreateUserUseCaseResponse = Promise<Either<UserAlreadyExistsError, { user: User }>>

@Injectable()
export class CreateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute({
    name,
    email,
    password
  }: CreateUserUseCaseRequest): CreateUserUseCaseResponse {
    const userExists = await this.userRepository.findByEmail(email)

    if (userExists) {
      return left(new UserAlreadyExistsError(email))
    }

    const user = User.create({
      name,
      email,
      password: await this.hasher.hash(password)
    })

    await this.userRepository.create(user)

    return right({ user })
  }
}

import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { Hasher } from '../cryptography/hasher'
import { User } from '../entities/user'
import { UserAlreadyExistsError } from '../errors/user-already-exists-error'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UserRepository } from '../repositories/user-repository'

interface UpdateUserUseCaseRequest {
  id: string
  name: string
  email: string
  password: string
}

type UpdateUserUseCaseResponse = Promise<
  Either<UserNotFoundError | UserAlreadyExistsError, { user: User }>
>

@Injectable()
export class UpdateUserUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hasher: Hasher
  ) {}

  async execute({
    id,
    name,
    email,
    password
  }: UpdateUserUseCaseRequest): UpdateUserUseCaseResponse {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError(id))
    }

    if (email !== user.email) {
      const emailAlreadyExists = await this.userRepository.findByEmail(email)

      if (emailAlreadyExists) {
        return left(new UserAlreadyExistsError(email))
      }
    }

    user.update({
      name,
      email,
      password: await this.hasher.hash(password)
    })

    await this.userRepository.save(user)

    return right({ user })
  }
}

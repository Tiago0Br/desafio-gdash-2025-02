import { Injectable } from '@nestjs/common'
import { Either, left, right } from '@/core/either'
import { User } from '../entities/user'
import { UserNotFoundError } from '../errors/user-not-found-error'
import { UserRepository } from '../repositories/user-repository'

interface DeleteUserUseCaseRequest {
  id: string
}

type DeleteUserUseCaseResponse = Promise<
  Either<UserNotFoundError, { user: User }>
>

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({ id }: DeleteUserUseCaseRequest): DeleteUserUseCaseResponse {
    const user = await this.userRepository.findById(id)

    if (!user) {
      return left(new UserNotFoundError(id))
    }

    await this.userRepository.delete(id)

    return right({ user })
  }
}

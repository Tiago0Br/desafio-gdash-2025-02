import { Injectable } from '@nestjs/common'
import { Either, right } from '@/core/either'
import { User } from '../entities/user'
import { UserRepository } from '../repositories/user-repository'

interface FindAllUsersUseCaseRequest {
  limit: number
  offset: number
}

type FindAllUsersUseCaseResponse = Promise<Either<null, { users: User[] }>>

@Injectable()
export class FindAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    limit,
    offset
  }: FindAllUsersUseCaseRequest): FindAllUsersUseCaseResponse {
    const users = await this.userRepository.findAll({ limit, offset })

    return right({ users })
  }
}

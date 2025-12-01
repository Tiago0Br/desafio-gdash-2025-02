import { PaginationParams } from '@/core/types/pagination-params'
import { User } from '../entities/user'

export abstract class UserRepository {
  abstract create(user: User): Promise<void>

  abstract save(user: User): Promise<void>

  abstract findAll(params: PaginationParams): Promise<User[]>

  abstract findByEmail(email: string): Promise<User | null>

  abstract findById(id: string): Promise<User | null>

  abstract delete(id: string): Promise<void>
}

import { Controller, Get, Query } from '@nestjs/common'
import z from 'zod'
import { FindAllUsersUseCase } from '@/domain/users/use-cases/find-all-users'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '../../presenters/user-presenter'

const findAllUsersQuerySchema = z.object({
  limit: z.number().default(20),
  offset: z.number().default(0)
})

type FindAllUsersQuerySchema = z.infer<typeof findAllUsersQuerySchema>

const zodValidationPipe = new ZodValidationPipe(findAllUsersQuerySchema)

@Controller('/api/users')
export class FindAllUsersController {
  constructor(private readonly findAllUsers: FindAllUsersUseCase) {}

  @Get()
  async handle(
    @Query(zodValidationPipe) { limit, offset }: FindAllUsersQuerySchema
  ) {
    const result = await this.findAllUsers.execute({ limit, offset })

    const users = result.value?.users ?? []

    return {
      users: users.map(UserPresenter.present)
    }
  }
}

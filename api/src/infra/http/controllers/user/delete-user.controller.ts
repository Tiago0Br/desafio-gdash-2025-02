import { Controller, Delete, HttpCode, NotFoundException } from '@nestjs/common'
import { DeleteUserUseCase } from '@/domain/users/use-cases/delete-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import type { UserPayload } from '@/infra/auth/jwt.strategy'
import { ERROR_CODES } from '@/infra/http/error-codes'

@Controller('/users')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@CurrentUser() { sub: loggedUserId }: UserPayload) {
    const result = await this.deleteUser.execute({ id: loggedUserId })

    if (result.isLeft()) {
      const error = result.value
      throw new NotFoundException(error.message, {
        description: ERROR_CODES.userNotFound
      })
    }
  }
}

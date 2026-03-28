import {
  Body,
  ConflictException,
  Controller,
  NotFoundException,
  Put
} from '@nestjs/common'
import z from 'zod'
import { UserNotFoundError } from '@/domain/users/errors/user-not-found-error'
import { UpdateUserUseCase } from '@/domain/users/use-cases/update-user'
import { CurrentUser } from '@/infra/auth/current-user-decorator'
import type { UserPayload } from '@/infra/auth/jwt.strategy'
import { ERROR_CODES } from '@/infra/http/error-codes'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'

const updateUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)

@Controller('/users')
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUserUseCase) {}

  @Put()
  async handle(
    @CurrentUser() { sub: loggedUserId }: UserPayload,
    @Body(bodyValidationPipe) { name, email, password }: UpdateUserBodySchema
  ) {
    const result = await this.updateUser.execute({
      id: loggedUserId,
      name,
      email,
      password
    })

    if (result.isLeft()) {
      const message = result.value.message
      switch (result.value.constructor) {
        case UserNotFoundError:
          throw new NotFoundException(message, {
            description: ERROR_CODES.userNotFound
          })
        default:
          throw new ConflictException(message, {
            description: ERROR_CODES.userAlreadyExists
          })
      }
    }

    const { user } = result.value

    return {
      user: UserPresenter.present(user)
    }
  }
}

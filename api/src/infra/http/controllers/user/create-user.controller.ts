import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { CreateUserUseCase } from '@/domain/users/use-cases/create-user'
import { Public } from '@/infra/auth/public'
import { ERROR_CODES } from '@/infra/http/error-codes'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '@/infra/http/presenters/user-presenter'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6)
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Public()
  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const result = await this.createUser.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error.message, {
        description: ERROR_CODES.userAlreadyExists
      })
    }

    const { user } = result.value

    return {
      user: UserPresenter.present(user)
    }
  }
}

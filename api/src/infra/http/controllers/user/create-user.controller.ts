import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { CreateUserUseCase } from '@/domain/users/use-cases/create-user'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '../presenters/user-presenter'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6)
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('/api/users')
export class CreateUserController {
  constructor(private createUser: CreateUserUseCase) {}

  @Public()
  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const result = await this.createUser.execute(body)

    if (result.isLeft()) {
      const error = result.value
      throw new BadRequestException(error.message)
    }

    const { user } = result.value

    return {
      user: UserPresenter.present(user)
    }
  }
}

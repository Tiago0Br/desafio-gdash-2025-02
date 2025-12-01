import { Body, Controller, NotFoundException, Param, Put } from '@nestjs/common'
import z from 'zod'
import { UpdateUserUseCase } from '@/domain/users/use-cases/update-user'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserPresenter } from '../presenters/user-presenter'

const updateUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string()
})

const idSchema = z.string()

type UpdateUserBodySchema = z.infer<typeof updateUserBodySchema>
type UpdateUserIdSchema = z.infer<typeof idSchema>

const bodyValidationPipe = new ZodValidationPipe(updateUserBodySchema)
const idValidationPipe = new ZodValidationPipe(idSchema)

@Controller('/api/users/:id')
export class UpdateUserController {
  constructor(private readonly updateUser: UpdateUserUseCase) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) { name, email, password }: UpdateUserBodySchema,
    @Param('id', idValidationPipe) id: UpdateUserIdSchema
  ) {
    const result = await this.updateUser.execute({
      id,
      name,
      email,
      password
    })

    if (result.isLeft()) {
      const error = result.value
      throw new NotFoundException(error.message)
    }

    const { user } = result.value

    return {
      user: UserPresenter.present(user)
    }
  }
}

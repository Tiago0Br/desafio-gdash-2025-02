import {
  Controller,
  Delete,
  HttpCode,
  NotFoundException,
  Param
} from '@nestjs/common'
import z from 'zod'
import { DeleteUserUseCase } from '@/domain/users/use-cases/delete-user'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const idSchema = z.string()

type DeleteUserIdSchema = z.infer<typeof idSchema>

const idValidationPipe = new ZodValidationPipe(idSchema)

@Controller('/api/users/:id')
export class DeleteUserController {
  constructor(private readonly deleteUser: DeleteUserUseCase) {}

  @Delete()
  @HttpCode(204)
  async handle(@Param('id', idValidationPipe) id: DeleteUserIdSchema) {
    const result = await this.deleteUser.execute({ id })

    if (result.isLeft()) {
      const error = result.value
      throw new NotFoundException(error.message)
    }
  }
}

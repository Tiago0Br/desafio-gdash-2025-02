import { Controller, Delete, Param } from '@nestjs/common'
import z from 'zod'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserService } from './user.service'

const idSchema = z.string()

type DeleteUserIdSchema = z.infer<typeof idSchema>

const idValidationPipe = new ZodValidationPipe(idSchema)

@Controller('/api/users/:id')
export class DeleteUserController {
  constructor(private userService: UserService) {}

  @Delete()
  async handle(@Param('id', idValidationPipe) id: DeleteUserIdSchema) {
    await this.userService.deleteById(id)

    return {
      message: 'User deleted successfully'
    }
  }
}

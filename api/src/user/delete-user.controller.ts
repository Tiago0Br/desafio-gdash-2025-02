import { Controller, Delete, Param } from '@nestjs/common'
import { ZodValidationPipe } from 'src/http/pipes/zod-validation.pipe'
import z from 'zod'
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

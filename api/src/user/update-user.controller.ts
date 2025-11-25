import { Body, Controller, Param, Put } from '@nestjs/common'
import { ZodValidationPipe } from 'src/http/pipes/zod-validation.pipe'
import z from 'zod'
import { UserService } from './user.service'

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
  constructor(private userService: UserService) {}

  @Put()
  async handle(
    @Body(bodyValidationPipe) body: UpdateUserBodySchema,
    @Param('id', idValidationPipe) id: UpdateUserIdSchema
  ) {
    await this.userService.updateById(id, body)

    return {
      message: 'User updated successfully'
    }
  }
}

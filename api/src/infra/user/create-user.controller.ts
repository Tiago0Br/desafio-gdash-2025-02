import { BadRequestException, Body, Controller, Post } from '@nestjs/common'
import z from 'zod'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'
import { UserService } from './user.service'

const createUserBodySchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string().min(6)
})

type CreateUserBodySchema = z.infer<typeof createUserBodySchema>

const bodyValidationPipe = new ZodValidationPipe(createUserBodySchema)

@Controller('/api/users')
export class CreateUserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post()
  async handle(@Body(bodyValidationPipe) body: CreateUserBodySchema) {
    const userExists = await this.userService.findUniqueByEmail(body.email)

    if (userExists) {
      throw new BadRequestException('User already exists')
    }

    await this.userService.create(body)

    return {
      message: 'User created successfully'
    }
  }
}

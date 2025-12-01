import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/domain/users/use-cases/authenticate'
import { Public } from '@/infra/auth/public'
import { ZodValidationPipe } from '@/infra/http/pipes/zod-validation.pipe'

const authenticationBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

type AuthenticationBodySchema = z.infer<typeof authenticationBodySchema>

const zodValidationPipe = new ZodValidationPipe(authenticationBodySchema)

@Controller('/api/auth')
export class AuthenticateController {
  constructor(private readonly authenticate: AuthenticateUseCase) {}

  @Public()
  @Post()
  async handle(@Body(zodValidationPipe) { email, password }: AuthenticationBodySchema) {
    const result = await this.authenticate.execute({ email, password })

    if (result.isLeft()) {
      const error = result.value
      throw new UnauthorizedException(error.message)
    }

    const { token } = result.value

    return {
      access_token: token
    }
  }
}

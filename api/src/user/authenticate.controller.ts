import {
  Body,
  Controller,
  NotFoundException,
  Post,
  UnauthorizedException
} from '@nestjs/common'
import { Public } from 'src/auth/public'
import { JwtEncrypter } from 'src/cryptography/jwt-encrypter'
import { ZodValidationPipe } from 'src/http/pipes/zod-validation.pipe'
import { z } from 'zod'
import { UserService } from './user.service'

const authenticationBodySchema = z.object({
  email: z.email(),
  password: z.string().min(6)
})

type AuthenticationBodySchema = z.infer<typeof authenticationBodySchema>

const zodValidationPipe = new ZodValidationPipe(authenticationBodySchema)

@Controller('/api/auth')
export class AuthenticateController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtEncrypter: JwtEncrypter
  ) {}

  @Public()
  @Post()
  async handle(@Body(zodValidationPipe) body: AuthenticationBodySchema) {
    const { email, password } = body

    const user = await this.userService.findUniqueByEmail(email)

    if (!user) {
      throw new NotFoundException('User not found')
    }

    if (password !== user.password) {
      throw new UnauthorizedException('Invalid credentials')
    }

    const userId = user._id.toString()

    const token = await this.jwtEncrypter.encrypt({
      sub: userId
    })

    return {
      access_token: token
    }
  }
}

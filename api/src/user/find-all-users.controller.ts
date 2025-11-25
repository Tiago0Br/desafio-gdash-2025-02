import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('/api/users')
export class FindAllUsersController {
  constructor(private userService: UserService) {}

  @Get()
  async handle() {
    const users = await this.userService.findAll()

    return {
      users
    }
  }
}

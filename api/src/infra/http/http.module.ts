import { Module } from '@nestjs/common'
import { AuthenticateUseCase } from '@/domain/users/use-cases/authenticate'
import { CreateUserUseCase } from '@/domain/users/use-cases/create-user'
import { DeleteUserUseCase } from '@/domain/users/use-cases/delete-user'
import { FindAllUsersUseCase } from '@/domain/users/use-cases/find-all-users'
import { UpdateUserUseCase } from '@/domain/users/use-cases/update-user'
import { CryptographyModule } from '../cryptography/cryptography.module'
import { DatabaseModule } from '../database/database.module'
import { AuthenticateController } from './controllers/user/authenticate.controller'
import { CreateUserController } from './controllers/user/create-user.controller'
import { DeleteUserController } from './controllers/user/delete-user.controller'
import { FindAllUsersController } from './controllers/user/find-all-users.controller'
import { UpdateUserController } from './controllers/user/update-user.controller'

@Module({
  imports: [DatabaseModule, CryptographyModule],
  controllers: [
    AuthenticateController,
    CreateUserController,
    DeleteUserController,
    FindAllUsersController,
    UpdateUserController
  ],
  providers: [
    AuthenticateUseCase,
    CreateUserUseCase,
    DeleteUserUseCase,
    FindAllUsersUseCase,
    UpdateUserUseCase
  ]
})
export class HttpModule {}

import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CryptographyModule } from 'src/cryptography/cryptography.module'
import { AuthenticateController } from './authenticate.controller'
import { CreateUserController } from './create-user.controller'
import { DeleteUserController } from './delete-user.controller'
import { FindAllUsersController } from './find-all-users.controller'
import { User, UserSchema } from './schemas/user.schema'
import { UpdateUserController } from './update-user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [
    CreateUserController,
    FindAllUsersController,
    UpdateUserController,
    DeleteUserController,
    AuthenticateController
  ],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    CryptographyModule
  ],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}

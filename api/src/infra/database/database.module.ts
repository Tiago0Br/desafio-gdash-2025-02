import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { User as UserModel } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repositories/user-repository'
import { MongooseUserRepository } from './repositories/mongoose-user-repository'
import { UserSchema } from './schemas/user.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UserModel.name, schema: UserSchema }])
  ],
  providers: [
    {
      provide: UserRepository,
      useClass: MongooseUserRepository
    }
  ],
  exports: [UserRepository]
})
export class DatabaseModule {}

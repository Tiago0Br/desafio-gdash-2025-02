import { User } from '@/domain/users/entities/user'
import { User as UserModel } from '@/infra/database/schemas/user.schema'

export class MongooseUserMapper {
  static toDomain(raw: UserModel): User {
    return User.create(raw, raw._id)
  }

  static toMongoose(user: User): UserModel {
    return {
      _id: user.id,
      name: user.name,
      email: user.email,
      password: user.password
    }
  }
}

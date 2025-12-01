import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { PaginationParams } from '@/core/types/pagination-params'
import { User } from '@/domain/users/entities/user'
import { UserRepository } from '@/domain/users/repositories/user-repository'
import { UserModel } from '@/infra/database/schemas/user.schema'
import { MongooseUserMapper } from '../mappers/mongoose-user-mapper'

@Injectable()
export class MongooseUserRepository implements UserRepository {
  constructor(@InjectModel(UserModel.name) private userModel: Model<UserModel>) {}

  async create(user: User): Promise<void> {
    await this.userModel.create(MongooseUserMapper.toMongoose(user))
  }

  async save(user: User): Promise<void> {
    await this.userModel
      .updateOne({ _id: user.id }, MongooseUserMapper.toMongoose(user))
      .exec()
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel.findOne({ email }).exec()

    return user ? MongooseUserMapper.toDomain(user) : null
  }

  async findAll({ limit, offset }: PaginationParams): Promise<User[]> {
    const users = await this.userModel.find().skip(offset).limit(limit).exec()

    return users.map(MongooseUserMapper.toDomain)
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.userModel.findById(id).exec()

    return user ? MongooseUserMapper.toDomain(user) : null
  }

  async delete(id: string): Promise<void> {
    await this.userModel.deleteOne({ _id: id }).exec()
  }
}

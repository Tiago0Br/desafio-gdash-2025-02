import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User } from './schemas/user.schema'

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: User) {
    const createdUser = new this.userModel(user)
    return createdUser.save()
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec()
  }

  async findUniqueByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec()
  }

  async getById(id: string): Promise<User> {
    const result = await this.userModel.findById(id).exec()

    if (!result) {
      throw new NotFoundException('User not found')
    }

    return result
  }

  async updateById(id: string, user: User): Promise<User> {
    const result = await this.userModel.findByIdAndUpdate(id, user).exec()

    if (!result) {
      throw new NotFoundException('User not found')
    }

    return result
  }

  async deleteById(id: string): Promise<User> {
    const result = await this.userModel.findByIdAndDelete(id).exec()

    if (!result) {
      throw new NotFoundException('User not found')
    }

    return result
  }
}

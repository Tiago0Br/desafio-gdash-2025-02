import { User } from '@/domain/users/entities/user'

export class UserPresenter {
  static present(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email
    }
  }
}

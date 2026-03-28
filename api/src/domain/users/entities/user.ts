import { Entity } from '@/core/entities/entity'

export interface UserProps {
  name: string
  email: string
  password: string
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get password() {
    return this.props.password
  }

  update(props: UserProps) {
    this.props = {
      ...this.props,
      ...props
    }
  }

  static create(props: UserProps, id?: string) {
    return new User(props, id)
  }
}

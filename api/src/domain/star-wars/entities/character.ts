import { Entity } from '@/core/entities/entity'

export interface CharacterProps {
  name: string
  gender: string
  height: string
  mass: string
  skinColor: string
  birthYear: string
}

export class Character extends Entity<CharacterProps> {
  get name() {
    return this.props.name
  }

  get gender() {
    return this.props.gender
  }

  get mass() {
    return this.props.mass
  }

  get skinColor() {
    return this.props.skinColor
  }

  get height() {
    return this.props.height
  }

  get birthYear() {
    return this.props.birthYear
  }

  static create(props: CharacterProps, id?: string) {
    return new Character(props, id)
  }
}

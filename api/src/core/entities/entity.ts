import { Types } from 'mongoose'

export class Entity<Props> {
  private _id: string
  protected props: Props

  get id() {
    return this._id
  }

  protected constructor(props: Props, id?: string) {
    this._id = id ?? new Types.ObjectId().toString()
    this.props = props
  }

  public equals(entity: Entity<unknown>): boolean {
    return this === entity || this.id === entity.id
  }
}

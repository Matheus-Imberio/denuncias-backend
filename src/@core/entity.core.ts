import { UUID } from 'src/shared/utils/uuid';

export abstract class Entity<T> {
  protected _id: string | undefined;
  public readonly props: T;

  get id(): string | undefined {
    return this._id;
  }

  constructor(props: T, id?: string) {
    if (id !== undefined && id !== null && !UUID.validate(id)) {
      throw new Error(`The provided id "${id}" is not a valid UUID v7.`);
    }
    this._id = id;
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object === null || object === undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!(object instanceof Entity)) {
      return false;
    }

    return this._id === object._id;
  }
}

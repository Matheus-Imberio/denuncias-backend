export abstract class Sanitizer<T> {
  protected readonly props: T;

  constructor(value: T) {
    this.props = value;

    Object.freeze(this);
  }
}

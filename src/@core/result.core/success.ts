import type { FailResult } from './fail';
import type { ResultAsync } from './async';
import { Result, success } from './utils';

export class SuccessResult<S, E> {
  readonly data: S;

  constructor(data: S) {
    this.data = data;
  }

  wasSuccess(): this is SuccessResult<S, E> {
    return true;
  }

  wasFailure(): this is FailResult<S, E> {
    return false;
  }

  match<A, B = A>(
    successCallback: (value: S) => A,
    _errorCallback: (error: E) => B,
  ): A | B {
    return successCallback(this.data);
  }

  orElse<U, A>(_callback: (error: E) => Result<U, A>): Result<U | S, A> {
    return success(this.data);
  }

  andThen<U, F>(callback: (value: S) => Result<U, F>): Result<U, E | F> {
    return callback(this.data);
  }

  andThenAsync<U, F>(
    callback: (value: S) => ResultAsync<U, F>,
  ): ResultAsync<U, E | F> {
    return callback(this.data);
  }

  unwrapOr<T>(_value: T): T | S {
    return this.data;
  }

  map<U>(callback: (value: S) => U): Result<U, E> {
    return success(callback(this.data));
  }

  mapErr<U>(_callback: (value: E) => U): Result<S, U> {
    return success(this.data);
  }

  unwrapOrThrow(): S {
    return this.data;
  }
}

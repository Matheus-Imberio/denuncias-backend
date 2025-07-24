import type { SuccessResult } from './success';
import { ResultAsync } from './async';
import { fail, Result } from './utils';

export class FailResult<S, E> {
  readonly data: E;

  constructor(data: E) {
    this.data = data;
  }

  wasSuccess(): this is SuccessResult<S, E> {
    return false;
  }

  wasFailure(): this is FailResult<S, E> {
    return true;
  }

  match<A, B = A>(
    _successCallback: (value: S) => A,
    errorCallback: (error: E) => B,
  ): A | B {
    return errorCallback(this.data);
  }

  orElse<U, A>(callback: (error: E) => Result<U, A>): Result<U | S, A> {
    return callback(this.data);
  }

  andThen<U, F>(_callback: (value: S) => Result<U, F>): Result<U, E | F> {
    return fail<U, E | F>(this.data);
  }

  andThenAsync<U, F>(
    _callback: (value: S) => ResultAsync<U, F>,
  ): ResultAsync<U, E | F> {
    return new ResultAsync(Promise.resolve(fail(this.data)));
  }

  unwrapOr<T>(value: T): T | S {
    return value;
  }

  map<U>(_callback: (value: S) => U): Result<U, E> {
    return fail(this.data);
  }

  mapErr<U>(callback: (value: E) => U): Result<S, U> {
    return fail(callback(this.data));
  }

  unwrapOrThrow(): S {
    throw new Error('Attempt to unwrap FailResult as success');
  }
}

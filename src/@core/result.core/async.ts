import { HttpError } from '../error.core';
import { fail, Result, success } from './utils';

export class ResultAsync<S, E> {
  readonly data: Promise<Result<S, E>>;

  constructor(data: Promise<Result<S, E>>) {
    this.data = data;
  }

  static fromResult<T, E>(result: Result<T, E>): ResultAsync<T, E> {
    return new ResultAsync(Promise.resolve(result));
  }
  static fromSafePromise<T, E = never>(promise: Promise<T>): ResultAsync<T, E> {
    const newPromise = promise.then((value: T) => success<T, E>(value));
    return new ResultAsync(newPromise);
  }

  static fromPromise<T, E>(
    promise: Promise<T>,
    errorFn: (e: unknown) => E,
  ): ResultAsync<T, E> {
    const newPromise = promise
      .then((value: T) => success<T, E>(value))
      .catch((e) => fail<T, E>(errorFn(e)));
    return new ResultAsync(newPromise);
  }

  static fromPromiseHttp<T>(
    promise: Promise<T>,
    errorFn?: (e: unknown) => HttpError,
  ): ResultAsync<T, HttpError> {
    const newPromise = promise
      .then((value: T) => success<T, HttpError>(value))
      .catch((e) => {
        if (errorFn) {
          return fail<T, HttpError>(errorFn(e));
        }
        return fail<T, HttpError>(HttpError.fromUnknown(e));
      });
    return new ResultAsync(newPromise);
  }

  match<A, B = A>(
    successCallback: (value: S) => A,
    errorCallback: (error: E) => B,
  ) {
    return this.data.then((result) =>
      result.match(successCallback, errorCallback),
    );
  }

  orElse<U, A>(
    callback: (error: E) => Result<U | S, A | E> | ResultAsync<U | S, A | E>,
  ) {
    return this.internalThen(async (result) => {
      if (result.wasSuccess()) {
        return result;
      }
      const mapped = callback(result.data);
      return mapped instanceof ResultAsync ? mapped.data : mapped;
    });
  }

  andThen<U, F>(
    callback: (value: S) => Result<U, F | E> | ResultAsync<U, F | E>,
  ) {
    return this.internalThen(async (result) => {
      if (result.wasFailure()) {
        return fail(result.data);
      }
      const mapped = callback(result.data);
      return mapped instanceof ResultAsync ? mapped.data : mapped;
    });
  }

  unwrapOr<T>(value: T) {
    return this.data.then((res) => res.unwrapOr(value));
  }

  map<U>(callback: (value: S) => U) {
    return new ResultAsync(this.data.then((res) => res.map(callback)));
  }

  result() {
    return this.data;
  }

  private internalThen<U, A>(
    mapper: (result: Result<S, E>) => Promise<Result<U, A>>,
  ): ResultAsync<U, A> {
    return new ResultAsync(this.data.then(mapper));
  }
}

import { FailResult } from './fail';
import { ResultAsync } from './async';
import { SuccessResult } from './success';

export type Result<S, E> = SuccessResult<S, E> | FailResult<S, E>;

/**
 * Função que retorna um Result de sucesso com o tipo de dado S
 * @param data Dado a ser retornado no Result
 * @returns Retorna um Result de sucesso com o tipo de dado S
 */
export function success<S = unknown, E = never>(data: S): Result<S, E> {
  return new SuccessResult<S, E>(data);
}

/**
 * Função que retorna um Result de falha com o tipo de dado E
 * @param data  Dado a ser retornado no Result
 * @returns Retorna um Result de falha com o tipo de dado E
 */
export function fail<S = never, E = unknown>(data: E): Result<S, E> {
  return new FailResult<S, E>(data);
}

// Retorna um ResultAsync de falha
export function failAsync<S = never, E = unknown>(data: E) {
  return new ResultAsync(Promise.resolve(new FailResult<S, E>(data)));
}

// Retorna um ResultAsync de sucesso
export function successAsync<S = unknown, E = never>(data: S) {
  return new ResultAsync(Promise.resolve(new SuccessResult<S, E>(data)));
}

/**
 * Recebe uma função que pode lançar uma exceção e retorna uma função que
 * ao ser executada retorna um Result.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function fromThrowable<Fn extends (...args: readonly any[]) => any, E>(
  fn: Fn,
  errorFn?: (e: unknown) => E,
): (...args: Parameters<Fn>) => Result<ReturnType<Fn>, E> {
  return (...args) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const result = fn(...args);
      return success(result);
    } catch (e) {
      return fail(errorFn ? errorFn(e) : (e as E));
    }
  };
}

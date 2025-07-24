import type { ResultAsync } from './async';
import type { FailResult } from './fail';
import type { SuccessResult } from './success';

// Esta interface serve apenas para documentação. As classes não devem implementar
// ela porque leva a inconsistências chatas por conta do data.

/**
 * Representa o resultado de uma operação que pode ter sucesso ou falhar.
 * É um contrato para um tipo que encapsula um valor de sucesso (S) ou um erro (E).
 *
 * @template S O tipo do valor em caso de sucesso.
 * @template E O tipo do erro em caso de falha.
 */
interface IResult<S, E> {
  /**
   * Contém o dado, seja ele de sucesso (S) ou de erro (E).
   * Para acessar o dado de forma segura, use `match`, `unwrapOr`, ou verifique
   * com `wasSuccess()` ou `wasFailure()` primeiro.
   */
  readonly data: S | E;

  /**
   * Retorna `true` se o resultado for um sucesso.
   * Atua como um type guard, garantindo que o tipo é `SuccessResult<S, E>` no escopo do if.
   *
   * @returns {this is SuccessResult<S, E>}
   */
  wasSuccess(): this is SuccessResult<S, E>;

  /**
   * Retorna `true` se o resultado for uma falha.
   * Atua como um type guard, garantindo que o tipo é `FailResult<S, E>` no escopo do if.
   *
   * @returns {this is FailResult<S, E>}
   */
  wasFailure(): this is FailResult<S, E>;

  /**
   * Executa um callback dependendo do estado do Result (sucesso ou falha).
   *
   * @template A O tipo de retorno do callback de sucesso.
   * @template B O tipo de retorno do callback de falha.
   * @param successCallback A função a ser executada se o resultado for um sucesso.
   * @param errorCallback A função a ser executada se o resultado for uma falha.
   * @returns {A | B} O resultado de um dos callbacks.
   */
  match<A, B = A>(
    successCallback: (value: S) => A,
    errorCallback: (error: E) => B,
  ): A | B;

  /**
   * Encadeia uma operação que pode falhar. Se o Result atual for um sucesso,
   * o callback é executado com o valor de sucesso. Se for uma falha, a falha
   * é propagada.
   *
   * @template U O tipo de sucesso do próximo Result.
   * @template F O tipo de falha do próximo Result.
   * @param callback A função que recebe o valor de sucesso e retorna um novo Result.
   * @returns {IResult<U, E | F>} Um novo Result.
   */
  andThen<U, F>(callback: (value: S) => IResult<U, F>): IResult<U, E | F>;

  /**
   * Encadeia uma operação assíncrona que pode falhar.
   *
   * @template U O tipo de sucesso do próximo ResultAsync.
   * @template F O tipo de falha do próximo ResultAsync.
   * @param callback A função que recebe o valor de sucesso e retorna um novo ResultAsync.
   * @returns {ResultAsync<U, E | F>} Um novo ResultAsync.
   */
  andThenAsync<U, F>(
    callback: (value: S) => ResultAsync<U, F>,
  ): ResultAsync<U, E | F>;

  /**
   * Se o Result atual for uma falha, executa o callback para tentar se recuperar
   * com um novo Result.
   *
   * @template U O tipo de sucesso do Result de recuperação.
   * @template A O tipo de falha do Result de recuperação.
   * @param callback A função que recebe o erro e retorna um novo Result.
   * @returns {IResult<S | U, A>} Um novo Result.
   */
  orElse<U, A>(callback: (error: E) => IResult<U, A>): IResult<U | S, A>;

  /**
   * Transforma o valor de sucesso de um Result usando um callback, mantendo o erro inalterado.
   *
   * @template U O novo tipo do valor de sucesso.
   * @param callback A função para transformar o valor de sucesso.
   * @returns {IResult<U, E>} Um novo Result com o valor de sucesso mapeado.
   */
  map<U>(callback: (value: S) => U): IResult<U, E>;

  /**
   * Transforma o erro de um Result usando um callback, mantendo o valor de sucesso inalterado.
   *
   * @template U O novo tipo do valor de erro.
   * @param callback A função para transformar o valor de erro.
   * @returns {IResult<S, U>} Um novo Result com o erro mapeado.
   */
  mapErr<U>(callback: (value: E) => U): IResult<S, U>;

  /**
   * Retorna o valor de sucesso ou um valor padrão caso seja uma falha.
   *
   * @template T O tipo do valor padrão.
   * @param value O valor padrão a ser retornado em caso de falha.
   * @returns {S | T} O valor de sucesso ou o valor padrão.
   */
  unwrapOr<T>(value: T): T | S;

  /**
   * Retorna o valor de sucesso ou lança uma exceção se for uma falha.
   *
   * @throws {Error} Lança um erro se o Result for uma falha.
   * @returns {S} O valor de sucesso.
   */
  unwrapOrThrow(): S;
}

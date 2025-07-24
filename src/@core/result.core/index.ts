// utilidades adicionadas com o famoso ctrl+c ctrl+v das bibliotecas neverthrow e ts-result-es
// o motivo para não adicionar utilizar uma das bibliotecas aqui é: gera breaking changes 👍

export { ResultAsync } from './async';
export {
  success,
  fail,
  successAsync,
  failAsync,
  fromThrowable,
  Result,
} from './utils';

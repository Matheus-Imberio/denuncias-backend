import { ErrorSchema, HttpError } from './error.core';
import { Result } from './result.core';

export type ExpectedResponse<R, E extends ErrorSchema = HttpError> = Promise<
  Result<R, E>
>;

export interface UseCase<
  Input = unknown,
  Output = unknown,
  E extends ErrorSchema = HttpError
> {
  execute(input: Input): ExpectedResponse<Output, E>;
}
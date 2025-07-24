import { ErrorSchema, HttpError } from './error.core';
import { Result } from './result.core';

export type ExpectedResponse<R, E extends ErrorSchema = HttpError> = Promise<
  Result<R, E>
>;

export abstract class UseCase {
  abstract execute(...args: unknown[]): ExpectedResponse<unknown, ErrorSchema>;
}

export type ErrorSchema = {
  statusCode: number;
  message: string;
};

type DefaultErrorNames = 'notFound' | 'alreadyExists';

export const DefaultErrorSchema: Readonly<
  Record<DefaultErrorNames, ErrorSchema>
> = {
  notFound: {
    message: 'Not found',
    statusCode: 404,
  },
  alreadyExists: {
    message: 'Already exists',
    statusCode: 400,
  },
};

export class HttpError extends Error {
  readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = 'HttpError';
  }

  static fromUnknown(e: unknown) {
    const internalServerError = new HttpError('Internal Server Error', 500);
    internalServerError.cause = e;

    return internalServerError;
  }

  equals(error: HttpError | ErrorSchema) {
    return (
      error.statusCode === this.statusCode && error.message === this.message
    );
  }
}

export function makeModuleError<
  const R extends Readonly<Record<string, ErrorSchema>>,
  const T extends keyof R = keyof R,
>(moduleName: string, schema: R) {
  function createError(name: T | DefaultErrorNames) {
    const error = getErrorSchema(name);
    return new HttpError(error.message, error.statusCode);
  }

  function getErrorSchema(name: T | DefaultErrorNames): ErrorSchema {
    const error =
      schema[name as T] ?? DefaultErrorSchema[name as DefaultErrorNames];

    return {
      message: '[' + moduleName + '] ' + error.message,
      statusCode: error.statusCode,
    };
  }

  return {
    createError,
    getErrorSchema,
  };
}

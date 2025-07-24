import { HttpStatus } from '@nestjs/common';
import { HttpError } from 'src/@core/error.core';
import { fromThrowable } from 'src/@core/result.core';
import { z, ZodError } from 'zod';

export function partialSchema<
  T extends ReturnType<typeof z.object>,
  O extends object = z.infer<T>,
>(schema: T, ...requiredKeys: Array<keyof z.infer<T>>) {
  const keys = (
    requiredKeys.length ? requiredKeys : Object.keys(schema._def.shape())
  ) as string[];

  return schema.partial().superRefine((obj, ctx): obj is Partial<O> => {
    const objKeys = Object.keys(obj);

    const hasAtLeastOneKey = objKeys.some((key) => keys.some((k) => k === key));

    if (!hasAtLeastOneKey) {
      ctx.addIssue({
        code: 'invalid_type',
        message: 'Required',
        expected: 'object',
        received: 'undefined',
        path: keys,
      });
    }

    if (objKeys.length && objKeys.every((k) => obj[k] === undefined)) {
      console.warn(
        new Error(
          'O formato JSON não possui `undefined`. Se você recebeu este erro, provavelmente você passou os dados para a validação de maneira incorreta.',
        ),
      );

      ctx.addIssue({
        code: 'invalid_type',
        message: 'Required',
        expected: 'object',
        received: 'undefined',
        path: keys,
      });
    }

    return hasAtLeastOneKey;
  });
} // hehehe!

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createValidator<T extends (...args: any[]) => any>(
  zodParseFn: T,
  moduleName: string,
) {
  return fromThrowable(zodParseFn, (error) => {
    if (error instanceof ZodError) {
      const message = error.errors
        .map((error) => `${error.message}: ${error.path.join(', ')}`)
        .join('; ');

      return new HttpError(
        `[${moduleName}] ` + message,
        HttpStatus.BAD_REQUEST,
      );
    }

    return HttpError.fromUnknown(error);
  });
}

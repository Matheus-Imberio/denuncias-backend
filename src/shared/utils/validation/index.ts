import { success, fail, Result } from 'src/@core/result.core';

export function isStringEmpty(
  string: string | null | undefined,
): string is null | undefined {
  return !string || string.trim() === '';
}

export function isValueEmpty<T>(
  v: T | undefined | null,
): v is undefined | null {
  return v === undefined || v === null;
}

/**
 * Retorna sucesso se o valor é diferente de undefined e null. Fail do contrário.
 */
export function notEmpty<T>(
  v: T | undefined | null,
): Result<T, undefined | null> {
  if (!isValueEmpty(v)) {
    return success(v);
  }

  return fail(v);
}

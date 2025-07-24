import { makeModuleError } from 'src/@core/error.core';

export const {
  getErrorSchema: enderecoErrorSchema,
  createError: enderecoError,
} = makeModuleError('Endereco', {});

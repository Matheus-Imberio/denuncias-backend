import { makeModuleError } from 'src/@core/error.core';

export const {
  getErrorSchema: denunciaErrorSchema,
  createError: denunciaError,
} = makeModuleError('Denuncia', {});

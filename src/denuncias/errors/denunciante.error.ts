import { makeModuleError } from 'src/@core/error.core';

export const {
  getErrorSchema: denuncianteErrorSchema,
  createError: denuncianteError,
} = makeModuleError('Denunciante', {});

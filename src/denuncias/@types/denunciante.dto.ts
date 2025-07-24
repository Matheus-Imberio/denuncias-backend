import { createZodDto } from 'nestjs-zod';

import {
    createValidator,
    partialSchema,
} from 'src/shared/utils/validation/zod';

import { z } from 'zod';

const DenuncianteSchema = z.object({
  nome: z.string().nonempty().max(100),
  cpf: z.string().nonempty().length(11),
});

export const PartialDenuncianteSchema = partialSchema(DenuncianteSchema);

export class DenuncianteDTO extends createZodDto(DenuncianteSchema) {}
export class PartialDenuncianteDTO extends createZodDto(PartialDenuncianteSchema) {}

export const DenuncianteValidator = createValidator(
  (data) => DenuncianteSchema.parse(data),
  'Denunciantes',
);

export const partialDenuncianteValidator = createValidator(
  (data) => PartialDenuncianteSchema.parse(data),
  'Denunciantes',
);
import { createZodDto } from 'nestjs-zod';

import {
  createValidator,
  partialSchema,
} from 'src/shared/utils/validation/zod';

import { z } from 'zod';

const DenunciaSchema = z.object({
  titulo: z.string().nonempty().max(200),
  descricao: z.string().nonempty(),
  latitude: z.number(),
  longitude: z.number(),
  denunciante: z.optional(z.any()),
  endereco: z.optional(z.any()),
});

export const PartialDenunciaSchema = partialSchema(DenunciaSchema);

export class DenunciaDTO extends createZodDto(DenunciaSchema) {}
export class PartialDenunciaDTO extends createZodDto(PartialDenunciaSchema) {}

export const DenunciaValidator = createValidator(
  (data) => DenunciaSchema.parse(data),
  'Denuncias',
);

export const partialDenunciaValidator = createValidator(
  (data) => PartialDenunciaSchema.parse(data),
  'Denuncias',
);
